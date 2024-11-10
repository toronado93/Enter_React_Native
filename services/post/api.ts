import { ID, Query } from "react-native-appwrite";
import {
  database,
  appwriteConfig,
  avatar,
  account,
  storage,
  ImageGravity,
} from "@/lib/appwrite";
import { PostModel } from "./model";
import type { DocumentPickerAsset } from "expo-document-picker";
import {
  TDocumentType,
  IDocumentPickerPropsWithUserId,
} from "@/app/(tabs)/create";

const { databaseId, videoCollectionId } = appwriteConfig;

const getAllPosts = async (): Promise<PostModel.IPost[]> => {
  const posts = await database.listDocuments(databaseId, videoCollectionId);

  return posts.documents as unknown as PostModel.IPost[];
};

const getLatestPosts = async (): Promise<PostModel.IPost[]> => {
  const posts = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.videoCollectionId,
    [Query.orderDesc("$createdAt"), Query.limit(7)]
  );
  return posts.documents as unknown as PostModel.IPost[];
};

const searchPosts = async (query: string): Promise<PostModel.IPost[]> => {
  const posts = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.videoCollectionId,
    [Query.search("title", query)]
  );
  return posts.documents as unknown as PostModel.IPost[];
};

const getUserPosts = async (userId: string): Promise<PostModel.IPost[]> => {
  const posts = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.videoCollectionId,
    [Query.equal("creator", userId)]
  );
  return posts.documents as unknown as PostModel.IPost[];
};

// file upload things

const uploadFile = async (
  file: DocumentPickerAsset,
  injectedType: TDocumentType
) => {
  if (!file || !file.mimeType || !file.uri || !file.size) {
    throw new Error("Invalid file. Please select a valid file.");
  }

  const { mimeType, size, ...rest } = file;
  const asset = { type: mimeType, size, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );
    const fileUrl = await getFilePreview(uploadedFile.$id, injectedType);
    return fileUrl;
  } catch (error) {
    throw new Error("File upload failed.");
  }
};

const getFilePreview = async (fileId: string, injectedType: TDocumentType) => {
  let fileUrl;

  try {
    if (injectedType === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (injectedType === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Center,
        100
      );
    } else {
      throw new Error("Invalid file type");
    }
    if (!fileUrl) throw new Error("File url is not compatible");

    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
};

const createVideoPost = async (form: IDocumentPickerPropsWithUserId) => {
  const { thumbnail, video } = form;

  try {
    if (thumbnail && video) {
      const [thumbnailUrl, videoUrl] = await Promise.all([
        uploadFile(thumbnail, "image"),
        uploadFile(video, "video"),
      ]);

      const newPost = await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.videoCollectionId,
        ID.unique(),
        {
          title: form.title,
          thumbnail: thumbnailUrl,
          video: videoUrl,
          prompt: form.prompt,
          creator: form.userId,
        }
      );
      return newPost;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

const postServices = {
  getAllPosts,
  getLatestPosts,
  searchPosts,
  getUserPosts,
  createVideoPost,
};

export default postServices;
