import { account } from "@/lib/appwrite";
import { LoginModel } from "./model";

const SignIn = async (params: LoginModel.ISignIn) => {
  const { email, password } = params;
  const session = await account.createEmailPasswordSession(email, password);
  return session;
};

const SignOut = async (params: LoginModel.ISignOut) => {
  // simply delete current session on appwrite side
  const { sessionId } = params;
  const result = await account.deleteSession(sessionId);
  return result;
};

const loginService = {
  SignIn,
  SignOut,
};

export default loginService;
