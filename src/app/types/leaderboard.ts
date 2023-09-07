export interface LeaderBoard {
  userId: string;
  createdBy: string;
  name: string;
  leaderBoardEntries: LeaderBoardEntry[];
  active: boolean;
}

export interface LeaderBoardEntry {
  userId: string;
  individualName: string;
  date: Date;
  score: string;
}
