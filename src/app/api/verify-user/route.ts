import neynarClient from "@/clients/neynar";
import { isApiErrorResponse } from "@neynar/nodejs-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { signerUuid, fid } = (await req.json()) as {
    signerUuid: string;
    fid: string;
  };
  let isVerifiedUser = false;

  try {
    const { fid: userFid } = await neynarClient.lookupSigner(signerUuid);

    if (userFid === Number(fid)) {
      isVerifiedUser = true;
    } else {
      isVerifiedUser = false;
    }
    return NextResponse.json({ isVerifiedUser }, { status: 200 });
  } catch (error) {
    if (isApiErrorResponse(error) && error.status === 404) {
      return NextResponse.json(
        { ...error.response.data },
        { status: error.response.status }
      );
    } else {
      return NextResponse.json(
        { message: "Something went wrong in Neynar lookupSigner API" },
        { status: 500 }
      );
    }
  }
}
