type ParkrunEvent = {
  id: number;
  date: string;
  finishers: number;
  volunteers: number;
};

type ParkrunRunReport = {
  id: number;
  participants: number;
  firstTimers: string[];
  newPBs: string[];
  milestones: ParkrunRunReportMilestones;
  volunteers: string[];
}

type ParkrunRunReportMilestones = {
  half: string[];
  full: string[];
  ultra: string[];
  hundred: string[];
}