import { ID, Models } from "react-native-appwrite";
import { RegisterModel } from "./model";
import { account } from "@/lib/appwrite";
// create user method
const createUser = async (
  params: RegisterModel.ICreateAccountParams
): Promise<Models.User<Models.Preferences>> => {
  const { email, password, username } = params;
  const result = await account.create(ID.unique(), email, password, username);
  return result;
};

const registerServices = {
  createUser,
};

export default registerServices;
