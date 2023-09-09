export interface LeaderBoard {
  id: string;
  userId: string;
  createdBy: string;
  name: string;
  description: string | null;
  leaderBoardEntries: LeaderBoardEntry[];
  active: boolean;
  createdDate: number;
  unitOfMeasure: LeaderBoardUOfMType;
  sortEntriesFromHighestToLowest: boolean;
}

export interface LeaderBoardEntry {
  id: string;
  userId: string;
  individualName: string;
  date: Date;
  scoreInMinutes: number;
  scoreInSeconds: number;
  scoreInMilliseconds: number;
  scoreInReps: number;
}

export type LeaderBoardUOfMType = 'timeInMinutes' | 'reps';

export interface EntryTimeInMinutes {
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export interface reps {
  numberOfReps: number;
}
