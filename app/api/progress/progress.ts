export function computeProgress(lastLesson: number, totalLessons: number) {
  return Math.floor((lastLesson / totalLessons) * 100);
}