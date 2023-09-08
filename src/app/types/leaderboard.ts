export interface LeaderBoard {
  id: string;
  userId: string;
  createdBy: string;
  name: string;
  description: string | null;
  leaderBoardEntries: LeaderBoardEntry[];
  active: boolean;
  createdDate: number;
  unitOfMeasure: LeaderBoardUOfM;
  sortEntriesFromHighestToLowest: boolean;
}

export interface LeaderBoardEntry {
  id: string;
  userId: string;
  individualName: string;
  date: Date;
  score: string;
}

export type LeaderBoardUOfM =
  | 'minutes'
  | 'seconds'
  | 'meters'
  | 'miles'
  | 'pounds'
  | 'kilos'
  | 'reps'
  | 'sets';
