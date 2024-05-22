import { SetState } from "@neynar/react/dist/types/common";

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
    likes: Array<{ fid: number; fname: string }>;
    recasts: Array<{ fid: number; fname: string }>;
  };
  replies: { count: number };
}

export interface Feed {
  casts: Array<Cast>;
}

export interface UserInfo {
  signerUuid: string;
  fid: string;
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

export interface SIWNResponseData {
  fid: string;
  is_authenticated: boolean;
  signer_uuid: string;
}

export interface AppContextInterface {
  user: FarcasterUser | null;
  setUser: SetState<FarcasterUser | null>;
  signerUuid: string | null;
  setSignerUuid: SetState<string | null>;
  fid: string | null;
  setFid: SetState<string | null>;
}
