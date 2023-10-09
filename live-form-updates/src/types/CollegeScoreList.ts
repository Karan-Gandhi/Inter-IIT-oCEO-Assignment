import Entry from "./Entry";

export default interface CollegeScoreList {
  collegeName: string;
  score: number;
  games: Entry[];
}
