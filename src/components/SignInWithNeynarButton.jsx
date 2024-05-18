"use client";
import { useContext } from "react";
import { CastWithInteractions } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import Image from "next/image";
import "@farcaster/auth-kit/styles.css";
import { AuthKitProvider } from "@farcaster/auth-kit";
import { SignInButton } from "@farcaster/auth-kit";

export default function SignInWithNeynarButton() {
  return <div>Sign in with Neynar</div>;
}
