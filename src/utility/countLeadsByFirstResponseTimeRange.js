export default function countLeadsByFirstResponseTimeRange(
  leads,
  messages,
  minMinutes,
  maxMinutes,
  messageType
) {
  let count = 0;

  for (const lead of leads) {
    const leadCreatedAt = new Date(lead.createdAt);
    const contactId = lead.contactId;

    const validMessages = messages.filter((msg) => {
      if (msg.contactId !== contactId) return false;
      if (!msg.dateAdded) return false;
      if (new Date(msg.dateAdded) < leadCreatedAt) return false;
      if (messageType && msg.messageType !== messageType) return false;
      if (msg.direction !== "outbound") return false;
      return true;
    });

    if (!validMessages.length) continue;

    const firstMessage = validMessages.reduce((earliest, current) =>
      new Date(current.dateAdded) < new Date(earliest.dateAdded)
        ? current
        : earliest
    );

    const responseMinutes =
      (new Date(firstMessage.dateAdded) - leadCreatedAt) / (1000 * 60);

    // Range check
    if (
      responseMinutes >= minMinutes &&
      (maxMinutes === null || responseMinutes <= maxMinutes)
    ) {
      count++;
    }
  }

  return count;
}
