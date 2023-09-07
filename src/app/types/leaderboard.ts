export interface LeaderBoard {
  uid: string;
  createdBy: string;
  name: string;
  leaderBoardEntry: LeaderBoardEntry[];
  active: boolean;
}

export interface LeaderBoardEntry {
  uid: string;
  individualName: string;
  date: Date;
  score: string;
}
