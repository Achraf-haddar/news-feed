export function formatTimestamp(timestampString) {
  const originalDate = new Date(timestampString);
  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(originalDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function compareDates(dateString1, dateString2) {
  const date1 = new Date(formatTimestamp(dateString1));
  const date2 = new Date(formatTimestamp(dateString2));
  // Compare the dates
  if (date1 < date2) {
    return -1; // dateString1 is earlier than dateString2
  } else if (date1 > date2) {
    return 1; // dateString1 is later than dateString2
  } else {
    return 0; // Both dates are equal
  }
}
