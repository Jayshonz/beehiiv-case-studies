import fs from "fs";
import path from "path";
import { CaseStudy } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "case-studies.json");

export function getCaseStudies(): CaseStudy[] {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  const studies: CaseStudy[] = JSON.parse(raw);
  return studies.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addCaseStudy(
  study: Omit<CaseStudy, "id" | "createdAt">
): CaseStudy {
  const studies = getCaseStudies();
  const newStudy: CaseStudy = {
    ...study,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  studies.unshift(newStudy);
  fs.writeFileSync(DATA_FILE, JSON.stringify(studies, null, 2));
  return newStudy;
}
