import { Goal } from '@types/types';

export const formatDate = (date: string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const calculateProgress = (goal: Goal, progress: number): number => {
  const { target, timeline } = goal;
  const today = new Date();
  const endDate = new Date(timeline);
  const daysLeft = Math.ceil(
    (endDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
  );

  if (daysLeft <= 0) {
    return 100;
  } else {
    return ((progress / target) * 100).toFixed(2) as unknown as number;
  }
};

export const generateProgressData = (goal: Goal, progress: number) => {
  const progressPercentage = calculateProgress(goal, progress);
  const formattedDate = formatDate(new Date().toISOString());

  return {
    goalId: goal.id,
    date: formattedDate,
    progress: progressPercentage,
  };
};