export const getFormattedDate = (date: Date = new Date()): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };