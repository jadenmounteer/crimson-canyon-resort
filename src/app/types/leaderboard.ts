export interface LeaderBoard {
  uid: string;
  createdBy: string;
  name: string;
  leaderBoardEntry: LeaderBoardEntry[];
}

export interface LeaderBoardEntry {
  uid: string;
  individualName: string;
  date: Date;
  score: string;
}
