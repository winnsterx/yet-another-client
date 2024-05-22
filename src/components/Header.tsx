"use client";

import { useApp } from "@/Context/AppContext";
import { UserInfo } from "@/app/types";
import useLocalStorage from "@/hooks/use-local-storage-state";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
// import { cn } from "@/lib/utils";
import SignIn from "@/components/SignIn";

export const Header: FC = () => {
  const { userData, fid } = useApp();
  const [user, _1, removeItem] = useLocalStorage<UserInfo>("user");

  const handleSignOut = () => {
    removeItem();
    window.location.reload();
  };

  return (
    <nav
      className="flex justify-between items-center py-4 px-20"
      style={{ backgroundColor: "#ffff90" }}
    >
      <div className="flex items-center gap-4">
        <Link href="/">
          <p>yet another client</p>
        </Link>
      </div>

      <div className={"flex items-center gap-4"}>
        {userData?.display_name ? (
          <div className={"flex items-center gap-4"}>
            {userData?.pfp_url && (
              <Image
                src={userData?.pfp_url}
                alt="User profile picture"
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <p className="text-sm font-semibold">{userData?.display_name}</p>
            <button onClick={handleSignOut}>Sign out</button>
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    </nav>
  );
};
