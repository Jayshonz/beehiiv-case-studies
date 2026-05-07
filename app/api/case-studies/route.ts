import { NextRequest, NextResponse } from "next/server";
import { getCaseStudies, addCaseStudy } from "@/lib/case-studies";

export async function GET() {
  const studies = getCaseStudies();
  return NextResponse.json(studies);
}

export async function POST(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const authHeader = req.headers.get("authorization");

  if (!adminPassword || authHeader !== `Bearer ${adminPassword}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, advertiser, thumbnailUrl, caseStudyUrl } = body;

  if (!title || !advertiser || !thumbnailUrl || !caseStudyUrl) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const study = addCaseStudy({ title, advertiser, thumbnailUrl, caseStudyUrl });
  return NextResponse.json(study, { status: 201 });
}
