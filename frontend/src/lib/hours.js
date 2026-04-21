// Hours utility for M & J Auto Services
// America/Los_Angeles is the shop timezone (San Mateo, CA)

export const SHOP_HOURS = [
  { day: "Monday", label: "8 AM – 6 PM", open: 8, close: 18 },
  { day: "Tuesday", label: "8 AM – 6 PM", open: 8, close: 18 },
  { day: "Wednesday", label: "8 AM – 6 PM", open: 8, close: 18 },
  { day: "Thursday", label: "8 AM – 6 PM", open: 8, close: 18 },
  { day: "Friday", label: "8 AM – 6 PM", open: 8, close: 18 },
  { day: "Saturday", label: "8 AM – 12 PM", open: 8, close: 12 },
  { day: "Sunday", label: "Closed", open: null, close: null },
];

function getShopNow() {
  // Approximate America/Los_Angeles via Intl
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  const parts = fmt.formatToParts(new Date());
  const weekday = parts.find((p) => p.type === "weekday")?.value || "Monday";
  const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
  const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
  return { weekday, hour: hour + minute / 60 };
}

export function getShopStatus() {
  const { weekday, hour } = getShopNow();
  const entry = SHOP_HOURS.find((h) => h.day === weekday) || SHOP_HOURS[0];
  if (entry.open == null) {
    return { isOpen: false, today: weekday, hoursToday: "Closed" };
  }
  const isOpen = hour >= entry.open && hour < entry.close;
  return { isOpen, today: weekday, hoursToday: entry.label };
}

export function getTodayName() {
  return getShopNow().weekday;
}
