import { NeynarAPIClient } from "@neynar/nodejs-sdk";

const neynarClient = new NeynarAPIClient(process.env.NEYNAR_API_KEY as string);

export async function getFeedByChannel(channelId: string, nextPage: any) {
  try {
    const feed = await neynarClient.fetchFeedByChannelIds([channelId], {
      withRecasts: true,
      withReplies: true,
      limit: 10,
    });
    console.log("In getting channel feed:", feed);
    return feed;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getFnameFromFid(fid: any, viewerFid: any) {
  const user = await neynarClient.fetchBulkUsers([fid], {
    viewerFid: viewerFid,
  });
  console.log("User:", user.json());
  return user.json();
}
