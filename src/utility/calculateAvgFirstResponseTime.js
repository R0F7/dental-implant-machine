export default function calculateAvgFirstResponseTime(
  leads,
  messages,
  messageType
) {
  let totalResponseHours = 0;
  let validLeadCount = 0;

  for (const lead of leads) {
    const leadCreatedAt = new Date(lead.createdAt);
    const contactId = lead.contactId;

    const validMessages = messages.filter((msg) => {
      if (msg.contactId !== contactId) return false;
      if (!msg.dateAdded) return false;
      if (new Date(msg.dateAdded) < leadCreatedAt) return false;
      if (messageType && msg.messageType !== messageType) return false;
      return true;
    });

    if (!validMessages.length) continue;

    const firstMessage = validMessages.reduce((earliest, current) =>
      new Date(current.dateAdded) < new Date(earliest.dateAdded)
        ? current
        : earliest
    );

    const responseHours =
      (new Date(firstMessage.dateAdded) - leadCreatedAt) / (1000 * 60 * 60);

    totalResponseHours += responseHours;
    validLeadCount++;
  }

  if (!validLeadCount) return 0;

  return totalResponseHours / validLeadCount;
}
