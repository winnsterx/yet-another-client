import {
  FeedType,
  FilterType,
  NeynarAPIClient,
  isApiErrorResponse,
} from "@neynar/nodejs-sdk";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const neynarClient = new NeynarAPIClient(process.env.NEYNAR_API_KEY as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const feed = await neynarClient.fetchFeed(FeedType.Filter, {
      filterType: FilterType.GlobalTrending,
      withRecasts: false,
    });

    res.status(200).json(feed);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch feed from Neynar" });
  }
}
