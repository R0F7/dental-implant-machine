export default function hoursToDayTime(hours) {
  const totalSeconds = Math.floor(hours * 60 * 60);

  const days = Math.floor(totalSeconds / (24 * 3600));
  const remainingAfterDays = totalSeconds % (24 * 3600);

  const hrs = Math.floor(remainingAfterDays / 3600);
  const remainingAfterHours = remainingAfterDays % 3600;

  const mins = Math.floor(remainingAfterHours / 60);
  const secs = remainingAfterHours % 60;

  return { days, hours: hrs, minutes: mins, seconds: secs };
}
