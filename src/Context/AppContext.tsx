"use client";

import { User } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import useLocalStorage from "@/hooks/use-local-storage-state";
import {
  FC,
  createContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
  useContext,
} from "react";
import { UserInfo } from "@/app/types";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
  children: React.ReactNode;
}

interface AppContextInterface {
  userData: User | null;
  setUserData: SetState<User | null>;
  signerUuid: string | null;
  setSignerUuid: SetState<string | null>;
  fid: string | null;
  setFid: SetState<string | null>;
}

const AppContext = createContext<AppContextInterface | null>(null);

export const AppProvider: FC<Props> = ({ children }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [signerUuid, setSignerUuid] = useState<string | null>(null);
  const [fid, setFid] = useState<string | null>(null);
  const [user, setUser, removeUser] = useLocalStorage<UserInfo | null>(
    "user",
    null
  );

  const lookupUser = useCallback(async () => {
    if (user && user.fid) {
      try {
        const res = await fetch(`/api/user/${user.fid}`);
        const data: User = await res.json();
        setUserData(data);
        setFid(user.fid);
      } catch (error) {
        console.error(error);
      }
    }
  }, [user]);

  // useEffect(() => {
  //   lookupUser();
  // }, [lookupUser]);

  const isUserLoggedIn = useCallback(async () => {
    if (signerUuid && fid) {
      const verifiedUser = await fetch(`/api/verify-user`, {
        method: "POST",
        body: JSON.stringify({ signerUuid, fid }),
      });

      if (verifiedUser) {
        setUser({ signerUuid, fid });
        lookupUser();
      } else {
        removeUser();
      }
    }
  }, [user, signerUuid, fid, setUser, removeUser]);

  useEffect(() => {
    if (user && !userData) {
      isUserLoggedIn();
    }
  }, [user, userData, isUserLoggedIn]);

  const value: AppContextInterface | null = useMemo(
    () => ({
      userData,
      setUserData,
      signerUuid,
      setSignerUuid,
      fid,
      setFid,
    }),
    [userData, setUserData, signerUuid, setSignerUuid, fid, setFid]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextInterface => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within a AppProvider");
  }
  return context;
};
