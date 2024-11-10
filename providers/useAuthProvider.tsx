import React, { createContext, ReactNode, useEffect, useState } from "react";
import { router } from "expo-router";

interface IUser {
  username: string;
  email: string;
  $id: string;
  avatar: string;
}

export enum EDecision {
  SESSION_CREATE = "create",
  SESSION_DELETE = "delete",
}

type TDecision = "create" | "delete";

interface IAuthContextType {
  user: IUser | null;
  login: (username: string, email: string, $id: string, avatar: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  sessionInfo: {
    session: string | null;
    sessionHandler: ({
      sessionId,
      decision,
    }: {
      sessionId: string;
      decision: TDecision;
    }) => void;
  };
}
const AuthContext = createContext<IAuthContextType | undefined>(undefined);

// provider creation

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FunctionComponent<IAuthProviderProps> = ({
  children,
}) => {
  // user logics
  const [user, setUser] = useState<IUser | null>(null);
  const login = (
    username: string,
    email: string,
    $id: string,
    avatar: string
  ) => {
    setUser({ username: username, email: email, $id: $id, avatar: avatar });
  };
  const logout = () => {
    setUser(null);
    router.push("/");
  };

  // session logics

  const [session, setSession] = useState<string | null>(null);

  const sessionHandler = ({
    sessionId,
    decision,
  }: {
    sessionId: string;
    decision: TDecision;
  }): void => {
    if (decision === "create") {
      setSession(sessionId);
    } else if (decision === "delete") {
      setSession;
    }
  };

  useEffect(() => {
    console.log("USER INSIDER", user);
    console.log("SESSION INSIDER", session);
  }, [user, session]);

  //double negation is used for isAuthenticated
  const authStructure = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    sessionInfo: { session, sessionHandler },
  };

  return (
    <AuthContext.Provider value={authStructure}>
      {children}
    </AuthContext.Provider>
  );
};

export { IAuthContextType, IUser, AuthContext };

export default AuthProvider;
