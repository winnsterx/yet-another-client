import neynarClient from "@/clients/neynar";
import { NextRequest, NextResponse } from "next/server";
import { isApiErrorResponse } from "@neynar/nodejs-sdk";

// fetches the user with given FID
export async function GET(
  req: NextRequest,
  { params }: { params: { fid: string } }
) {
  try {
    const fid = parseInt(params.fid);
    const { users } = await neynarClient.fetchBulkUsers([fid]);
    if (users.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(users[0], { status: 200 });
  } catch (err) {
    if (isApiErrorResponse(err)) {
      return NextResponse.json(
        { ...err.response.data },
        { status: err.response.status }
      );
    } else
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
  }
}
