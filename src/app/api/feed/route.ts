import { NextApiRequest, NextApiResponse } from "next";
import { FeedType, FilterType } from "@neynar/nodejs-sdk";
import neynarClient from "../../../clients/neynar";
import { NextRequest, NextResponse } from "next/server";

// sends data in json in response
// uses App Router for Next JS v13+
export async function GET(req: NextRequest) {
  try {
    const feed = await neynarClient.fetchFeed(FeedType.Filter, {
      filterType: FilterType.GlobalTrending,
      withRecasts: true,
    });

    return NextResponse.json(feed);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch feed from Neynar" },
      { status: 500 }
    );
  }
}
