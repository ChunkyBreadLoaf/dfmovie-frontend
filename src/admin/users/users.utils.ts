export const dateForatter = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
}).format;
