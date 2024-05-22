"use client";

import { useApp } from "@/Context/AppContext";
import useLocalStorage from "@/hooks/use-local-storage-state";
import { useCallback, useEffect } from "react";
import type { FC } from "react";

const SignIn: FC = () => {
  const [_, setUser] = useLocalStorage("user");
  const { setSignerUuid, setFid } = useApp();
  const clientId = process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID;

  // injects script into the page; sets the script's src to neynar's script
  useEffect(() => {
    let script = document.getElementById("siwn-script") as HTMLElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "siwn-script";
      document.body.appendChild(script);
    }
    script.src = "https://neynarxyz.github.io/siwn/raw/1.2.0/index.js";
    script.async = true;
    document.body.appendChild(script);

    // cleans up the script / button when the component is unmounted to prevent memory leaks or duplicated elements
    return () => {
      if (document.body && script) {
        document.body.removeChild(script);
      }
      let button = document.getElementById("siwn-button");
      if (button && button.parentElement) {
        button.parentElement.removeChild(button);
      }
    };
  }, []);

  if (!clientId) {
    throw new Error("NEXT_PUBLIC_NEYNAR_CLIENT_ID is not provided in env");
  }

  useEffect(() => {
    console.log("Window", window);
    window.onSignInSuccess = (data: any) => {
      setUser({
        signerUuid: data.signer_uuid,
        fid: data.fid,
      });
      setSignerUuid(data.signer_uuid);
      setFid(data.fid);
    };
    return () => {
      delete window.onSignInSuccess;
    };
  }, []);

  const getButton = useCallback(() => {
    return (
      <div
        className="neynar_signin"
        data-client_id={clientId}
        data-success-callback="onSignInSuccess"
      />
    );
  }, []);

  return <>{getButton()}</>;
};

export default SignIn;
