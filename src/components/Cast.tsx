"use client"

import { CastWithInteractions } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import Image from "next/image"
import { ReactElement } from "react";

export default function Cast({cast, author}: {cast:CastWithInteractions | undefined, author?:any}) {
    return (
        <div className="custom-border border-black p-6 transition-all duration-200 hover:border-rainbow">          <div className="flex gap-2 items-center">
            {(cast?.author.pfp_url || author?.pfp.url) && (
              <Image
                src={cast?.author.pfp_url || author?.pfp.url}
                alt={
                  cast?.author.display_name ||
                  author?.display_name ||
                  cast?.author.username
                }
                width={36}
                height={36}
                className="rounded-full"
              />
            )}
            <p className="font-semibold text-lg">
              {cast?.author.display_name ||
                cast?.author.username ||
                author?.display_name ||
                author?.username}
            </p>
          </div>
          <p className="mt-0">{cast?.text}</p>
        </div>
      );
    }