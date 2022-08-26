import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  console.log("running middleware");
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;
  if (token || pathname.includes("/api/auth")) {
    return NextResponse.next();
  }
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("http://localhost:3000/login");
  }
}

export const config = { matcher: ["/"] };
