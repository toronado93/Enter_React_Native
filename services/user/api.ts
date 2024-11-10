import { ID, Models, Query } from "react-native-appwrite";
import { database, appwriteConfig, avatar, account } from "@/lib/appwrite";

const { databaseId, userCollectionId, videoCollectionId } = appwriteConfig;

const inserUserinToDB = async (userData: Models.User<Models.Preferences>) => {
  const { email, name } = userData;

  const avatarUrl = avatar.getInitials(name);

  const result = await database.createDocument(
    databaseId,
    userCollectionId,
    ID.unique(),
    {
      accountId: userData.$id,
      email,
      username: name,
      avatar: avatarUrl,
    }
  );
  return result;
};

const getCurrentUser = async () => {
  const currentAccount = await account.get();
  if (!currentAccount) throw new Error("No such account!");

  const currentUser = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal("accountId", currentAccount.$id)]
  );
  if (!currentUser) throw new Error("No such user!!");
  return currentUser.documents[0];
};

const userServices = { inserUserinToDB, getCurrentUser };

export default userServices;
