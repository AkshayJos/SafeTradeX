 export const formatDate = (isoString) => {
  if (!isoString) return;
  
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // or true for AM/PM
    })
      .format(date);
  };