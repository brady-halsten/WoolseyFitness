import { MemberProfile, ClassBooking } from "@/types/member";

export const dummyMember: MemberProfile = {
  id: "12345",
  firstName: "Chris",
  lastName: "Woolsey",
  hasActiveMembership: true,
  classCredits: 4,
};

export const dummyBooking: ClassBooking | null = {
  id: "booking-001",
  name: "Reformer Strength",
  date: "November 6, 2026",
  time: "9:00 AM",
  instructor: "Christopher Woolsey",
};