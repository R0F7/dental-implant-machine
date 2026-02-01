// export default function countLeadsWithFirstResponseGreaterThan30Min(
//   leads,
//   messages,
//   messageType
// ) {
//   let count = 0;

//   for (const lead of leads) {
//     const leadCreatedAt = new Date(lead.createdAt);
//     const contactId = lead.contactId;

//     const validMessages = messages.filter((msg) => {
//       if (msg.contactId !== contactId) return false;
//       if (!msg.dateAdded) return false;
//       if (new Date(msg.dateAdded) < leadCreatedAt) return false;
//       if (messageType && msg.messageType !== messageType) return false;
//       return true;
//     });

//     if (!validMessages.length) continue;

//     const firstMessage = validMessages.reduce((earliest, current) =>
//       new Date(current.dateAdded) < new Date(earliest.dateAdded)
//         ? current
//         : earliest
//     );

//     const responseMinutes =
//       (new Date(firstMessage.dateAdded) - leadCreatedAt) / (1000 * 60);

//     // condition: greater than 30 minutes
//     if (responseMinutes > 30) {
//       count++;
//     }
//   }

//   return count;
// }

export default function countLeadsFirstResponseBetween0To15Min(
  leads,
  messages,
  messageType,
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
        : earliest,
    );

    const responseMinutes =
      (new Date(firstMessage.dateAdded) - leadCreatedAt) / (1000 * 60);

    // 👉 0 to 15 minutes
    if (responseMinutes >= 0 && responseMinutes <= 15) {
      count++;
    }
  }

  return count;
}
