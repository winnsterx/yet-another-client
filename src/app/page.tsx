"use client";

import { createContext, useEffect, useState } from "react";
import CastFeedItem from "@/components/CastFeedItem";
import {
  UserInfo,
  Feed,
  SIWNResponseData,
  AppContextInterface,
} from "@/app/types";
import SignIn from "@/components/SignIn";
import { Header } from "@/components/Header";

const AppContext = createContext<AppContextInterface | null>(null);

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [feed, setFeed] = useState<Feed | null>(null);
  const neynarClientId = process.env.NEYNAR_CLIENT_ID;

  const onSignInSuccess = (data: SIWNResponseData) => {
    // setFid(Number(data.fid));
    // setSignerUuid(data.signer_uuid);
  };

  useEffect(() => {
    async function fetchFeed() {
      try {
        const res = await fetch("/api/feed");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Feed = await res.json();
        setFeed(data);
      } catch (error) {
        console.log("Error fetching feed", error);
      }
    }
    fetchFeed();
  }, []);

  return (
    <div>
      <Header />

      <div className="flex flex-row h-screen">
        {/* Left Column */}
        <div className="w-1/4 min-w-[20%] hidden md:block">
          {/* Content for the left column */}
        </div>

        {/* Middle Column */}
        <div className="flex-1 min-w-[400px] max-w-[60%]">
          {feed && (
            <div>
              {feed.casts.map((cast) => (
                <CastFeedItem key={cast.hash} cast={cast} />
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-1/4 min-w-[20%] hidden md:block"></div>
      </div>
    </div>
  );
}
