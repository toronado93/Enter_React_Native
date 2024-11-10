import { TDocumentType } from "@/app/(tabs)/create";

export declare module PostModel {
  interface IPost {
    title: string;
    thumbnail: string;
    prompt: string;
    video: string;
    creator: UserModel.IUser;
    $id: string;
  }
}
