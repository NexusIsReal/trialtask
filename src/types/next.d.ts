import { NextResponse } from "next/server";

declare global {
  type RouteParams<T> = {
    params: T;
  };
} 