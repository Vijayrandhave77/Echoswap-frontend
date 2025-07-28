function DateHelper(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);

  if (isNaN(past.getTime())) {
    return "Invalid date";
  }

  if (past > now) return "just now";

  const secondsElapsed = Math.floor((now - past) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const { label, seconds } of intervals) {
    const count = Math.floor(secondsElapsed / seconds);
    if (count >= 1) {
      return `${count} ${label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export default DateHelper;

export function MMYY(date) {
  return new Date(date).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
}
