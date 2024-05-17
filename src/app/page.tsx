import Image from "next/image";
import { FeedType, FilterType, NeynarAPIClient, isApiErrorResponse } from "@neynar/nodejs-sdk";
import { AxiosError } from "axios";
import Cast from "@/components/Cast";

const neynarClient = new NeynarAPIClient(process.env.NEYNAR_API_KEY)

async function getFeed() {
  const feed = await neynarClient.fetchFeed(FeedType.Filter, {
    filterType: FilterType.GlobalTrending, 
    withRecasts: false
  })
  return {feed}
}

export default async function Home() {
  const feed = await getFeed()
  return (
    <div>
    <div>

    </div>
    <div>
      {feed && (
        <div>
          {feed.feed.casts.map((cast) => {
            return <Cast key={cast.thread_hash} cast={cast} />;
          })}
        </div>
      )}
      </div>
      </div>

  );
}
