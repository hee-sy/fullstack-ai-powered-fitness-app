export const renderTime = (time: string) => {
  const now = new Date();
  const startTime = new Date(time);
  const diffInSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
  const postfix = diffInSeconds < 0 ? "from now" : "ago";
  const absDiffInSeconds = Math.abs(diffInSeconds);

  if (absDiffInSeconds < 60) {
    return `${absDiffInSeconds} sec ${postfix}`;
  } else if (absDiffInSeconds < 3600) {
    const minutes = Math.floor(absDiffInSeconds / 60);
    return `${minutes} min ${postfix}`;
  } else if (absDiffInSeconds < 86400) {
    const hours = Math.floor(absDiffInSeconds / 3600);
    const minutes = Math.floor((absDiffInSeconds % 3600) / 60);
    return `${hours} hr${hours > 1 ? "s" : ""} ${minutes} min ${postfix}`;
  } else if (absDiffInSeconds < 172800) {
    const days = Math.floor(absDiffInSeconds / 86400);
    const hours = Math.floor((absDiffInSeconds % 86400) / 3600);
    const minutes = Math.floor((absDiffInSeconds % 3600) / 60);
    return `${days} day${days > 1 ? "s" : ""} ${hours} hr${hours > 1 ? "s" : ""} ${minutes} min ${postfix}`;
  } else {
    return startTime.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }
};
