import type { MemberProfile } from "@/types/member";

export const canBookClasses = (member: MemberProfile): boolean => {
  return member.hasActiveMembership || member.classCredits > 0;
};