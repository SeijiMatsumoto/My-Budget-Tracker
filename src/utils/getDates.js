export function getWeeksInMonthWithDateRanges(year, month) {
  const weeks = [];
  const firstDay = new Date(year, month - 1, 1); // Month is 0-indexed
  const lastDay = new Date(year, month, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(firstDay.getDate() - firstDay.getDay()); // Move to the previous Sunday

  while (startDate <= lastDay) {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); // Move to the next Saturday

    const startMonth = startDate.getMonth() + 1;
    const endMonth = endDate.getMonth() + 1;

    // Adjust start and end dates to fall within the current month
    const adjustedStartDate = new Date(Math.max(startDate, firstDay));
    const adjustedEndDate = new Date(Math.min(endDate, lastDay));

    const adjustedStartMonth = adjustedStartDate.getMonth() + 1;
    const adjustedEndMonth = adjustedEndDate.getMonth() + 1;

    // Check if the adjusted start and end dates are both in the current month
    if (adjustedStartMonth === month && adjustedEndMonth === month) {
      const weekRange =
        adjustedStartDate.getTime() === adjustedEndDate.getTime()
          ? `${adjustedStartMonth}/${adjustedStartDate.getDate()}`
          : `${adjustedStartMonth}/${adjustedStartDate.getDate()} - ${adjustedEndMonth}/${adjustedEndDate.getDate()}`;

      weeks.push(weekRange);
    }

    startDate.setDate(startDate.getDate() + 7); // Move to the next Sunday
  }

  return weeks;
}
