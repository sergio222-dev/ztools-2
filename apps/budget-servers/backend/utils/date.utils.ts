export function isValidMonth(month: string) {
  // Remove leading zeros
  const strippedMonth = month.replace(/^0+/, '');

  // Convert the stripped month value to a number
  const monthNumber = Number(strippedMonth);

  // Check if the month is a valid number between 1 and 12
  if (Number.isInteger(monthNumber) && monthNumber >= 1 && monthNumber <= 12) {
    return true;
  }

  return false;
}

export function isValidYear(year: string) {
  const strippedYear = year.replace(/^0+/, '');
  const yearNumber = Number(strippedYear);

  if (Number.isInteger(yearNumber)) {
    return true;
  }

  return false;
}
