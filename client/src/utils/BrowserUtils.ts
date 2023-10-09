export const isWithinIntervals = (intervals: number[][], target: number) =>
  intervals.filter(
    interval => interval[0] <= target && interval[1] > target && interval[0] !== -1 && interval[1] !== -1
  ).length >= 1;
