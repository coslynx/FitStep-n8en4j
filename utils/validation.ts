import { Goal } from "@types/types";

export const validateGoal = (goal: Goal): string | null => {
  if (!goal.name) {
    return "Goal name is required";
  }
  if (goal.name.length < 3) {
    return "Goal name must be at least 3 characters long";
  }
  if (!goal.target) {
    return "Goal target is required";
  }
  if (goal.target <= 0) {
    return "Goal target must be a positive number";
  }
  if (!goal.timeline) {
    return "Goal timeline is required";
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(goal.timeline)) {
    return "Goal timeline must be in the format YYYY-MM-DD";
  }
  return null;
};