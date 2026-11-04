export type MemberProfile = {
    id: string;
    firstName: string;
    lastName: string;
    hasActiveMembership: boolean;
    classCredits: number;
  };
  
  export type ClassBooking = {
    id: string;
    name: string;
    date: string;
    time: string;
    instructor: string;
  };