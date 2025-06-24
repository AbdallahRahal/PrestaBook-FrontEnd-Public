const dayIndexMap: { [key: string]: number } = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6
};
const dayName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

export function getDayIndexByDayName(day: string): number | undefined {
  return dayIndexMap[day.toLowerCase()];
}
export function getDayNameByDayIndex(index: number): string {
  return dayName[index];
}

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString()
};