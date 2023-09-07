export interface LeaderBoard {
  id: string;
  userId: string;
  createdBy: string;
  name: string;
  description: string | null;
  leaderBoardEntries: LeaderBoardEntry[];
  active: boolean;
  createdDate: number;
}

export interface LeaderBoardEntry {
  id: string;
  userId: string;
  individualName: string;
  date: Date;
  score: string;
}
