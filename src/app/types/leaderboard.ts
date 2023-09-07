export interface LeaderBoard {
  userId: string;
  createdBy: string;
  name: string;
  description: string | null;
  leaderBoardEntries: LeaderBoardEntry[];
  active: boolean;
  createdDate: number;
}

export interface LeaderBoardEntry {
  userId: string;
  individualName: string;
  date: Date;
  score: string;
}
