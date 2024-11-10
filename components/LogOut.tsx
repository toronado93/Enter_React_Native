import useAuth from "@/hooks/useAuth";
import { Image, TouchableOpacity, Alert } from "react-native";
import Icons from "@/constants/icons";
import loginService from "@/services/login/api";
import { CustomErrorExceptioner } from "@/utils/classes/CustomErrorException";
import { EDecision } from "@/providers/useAuthProvider";

const LogOut = () => {
  const {
    logout,
    sessionInfo: { session, sessionHandler },
  } = useAuth();

  const LogoutHandler = async () => {
    if (!session) return;
    // logout handler is made from two steps
    // First delete session from Appwrite side
    // Second delete session info inside of provider
    try {
      // delete session info appwrite side
      await loginService.SignOut({ sessionId: session });
      // delete session info in local
      sessionHandler({
        sessionId: session,
        decision: EDecision.SESSION_DELETE,
      });
      // delete user info and navigate user to login page
      logout();
    } catch (error: any) {
      const errorResult = new CustomErrorExceptioner(error);
      Alert.alert(String(errorResult.errorCode), errorResult.handleError());
    }
  };

  return (
    <TouchableOpacity
      onPress={LogoutHandler}
      className="flex w-full items-end mb-10"
    >
      <Image source={Icons.Logout} resizeMode="contain" className="w-6 h-6" />
    </TouchableOpacity>
  );
};

export default LogOut;
