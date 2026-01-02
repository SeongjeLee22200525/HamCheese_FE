export interface UserProfile {
  userId: number;
  name: string;
  firstMajor: string;
  secondMajor?: string;
  studentId: string;
  introduction: string;
  skillList: string[];
  peerGoodKeywords: string[];
  imageUrl: string;
}
