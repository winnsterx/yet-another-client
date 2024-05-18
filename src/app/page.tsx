"use client"
import Cast from "@/components/Cast";
import SignInWithNeynarButton from "@/components/SignInWithNeynarButton"
import { useEffect, useState } from "react";



export interface Cast {
  hash: string;
  author: {
    username: string;
    pfp_url: string;
    display_name: string;
  };
  text: string;
  timestamp: string;
  reactions: {
    likes: Array<{ fid: number, fname: string }>;
    recasts: Array<{ fid: number, fname: string }>;
  };
  replies: { count: number };
}

export interface Feed {
  casts: Array<Cast>
}

export interface FarcasterUser {
  signer_uuid: string;
  fid: number;
  fname: string;
  displayName: string;
  profile: {
    bio?: string;
  };
  pfp: string;
  followerCount: number;
  followingCount: number;
}

export default function Home() {
  const [user, setUser] = useState("")
  const [feed, setFeed] = useState<Feed | null>(null)

  useEffect(() => {
    async function fetchFeed() {
      try {
        const res = await fetch('/api/feed')
        const data: Feed = await res.json()
        setFeed(data)
      } catch (error) {
        console.log("Error fetching feed", error)
      }
    }
    fetchFeed()
  }, [])

  return (
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
              <Cast key={cast.hash} cast={cast} />
            ))}
          </div>
        )}
      </div>
      
      {/* Right Column */}
      <div className="w-1/4 min-w-[20%] hidden md:block">
        {/* Content for the right column */}
        {/* <SignInWithNeynarButton/> */}
      </div>
    </div>
  );
}