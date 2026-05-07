import { supabase } from "./supabase";
import { CaseStudy } from "./types";

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(toStudy);
}

export async function addCaseStudy(
  study: Omit<CaseStudy, "id" | "createdAt">
): Promise<CaseStudy> {
  const { data, error } = await supabase
    .from("case_studies")
    .insert({
      title: study.title,
      advertiser: study.advertiser,
      thumbnail_url: study.thumbnailUrl,
      case_study_url: study.caseStudyUrl,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return toStudy(data);
}

function toStudy(row: Record<string, string>): CaseStudy {
  return {
    id: row.id,
    title: row.title,
    advertiser: row.advertiser,
    thumbnailUrl: row.thumbnail_url,
    caseStudyUrl: row.case_study_url,
    createdAt: row.created_at,
  };
}
