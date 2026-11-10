// One place for how to reach Vektide: the contact page, the demo page, the office-hours
// strip and the structured data in Base.astro all read from here.
// Phone numbers appear on the contact page only; everywhere else, email is the direct contact.

export const email = 'contact@vektide.com';

// The founders' mobiles. Each one also takes WhatsApp and Viber.
export const phones = [
  { display: '984-3060594', e164: '+9779843060594' },
  { display: '982-4155217', e164: '+9779824155217' },
].map((p) => ({
  ...p,
  tel: `tel:${p.e164}`,
  whatsapp: `https://wa.me/${p.e164.slice(1)}`,
  viber: `viber://chat?number=${encodeURIComponent(p.e164)}`,
}));

// TODO: Facebook page URL once it exists.
export const socials = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/vektide-technologies/' },
  { name: 'Facebook', href: '#' },
  { name: 'Instagram', href: 'https://www.instagram.com/vektide/' },
];

export const address = 'Mahalaxmi-4, Lalitpur, Nepal';
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export const hours = {
  tz: 'Asia/Kathmandu',
  /** 0 = Sunday … 6 = Saturday. Nepal's week runs Sunday to Friday. */
  days: [0, 1, 2, 3, 4, 5],
  open: 9,
  close: 17,
  /** Public holidays the office is shut, as YYYY-MM-DD in Nepal time. */
  closedDates: [] as string[],
  text: 'Sunday to Friday, 9 AM to 5 PM',
};

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** The date and time in Lalitpur right now, whatever the visitor's own timezone. */
function inLalitpur(now: Date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: hours.tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  );
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday),
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
    time: new Intl.DateTimeFormat('en-US', { timeZone: hours.tz, hour: 'numeric', minute: '2-digit' }).format(now),
  };
}

const isWorkday = (day: number, date: string) => hours.days.includes(day) && !hours.closedDates.includes(date);

/** Whether the office is open at `now`: the local time (`lead`) and what that means (`note`). */
export function officeStatus(now = new Date()) {
  const t = inLalitpur(now);
  const workday = isWorkday(t.day, t.date);
  const open = workday && t.minutes >= hours.open * 60 && t.minutes < hours.close * 60;
  const lead = `It's ${t.time} in Lalitpur.`;
  const status = (note: string) => ({ open, lead, note, label: `${lead} ${note}` });

  if (open) return status("We're in, so expect a reply today.");
  if (workday && t.minutes < hours.open * 60) return status(`We open at ${hours.open} AM.`);

  // Find the next day the office opens.
  for (let ahead = 1; ahead <= 14; ahead++) {
    const n = inLalitpur(new Date(now.getTime() + ahead * 86_400_000));
    if (isWorkday(n.day, n.date)) return status(`We're back ${ahead === 1 ? 'tomorrow' : weekdays[n.day]} at ${hours.open} AM.`);
  }
  return status("We're closed for now.");
}

/**
 * The current time for the page. In dev, `?at=2026-11-14T10:00` pretends it's that time
 * in Lalitpur (and keeps ticking from there), so every office state can be checked.
 */
export function pageClock() {
  let offset = 0;
  if (import.meta.env.DEV && typeof location !== 'undefined') {
    const at = new URLSearchParams(location.search).get('at');
    const fake = at ? new Date(`${at}+05:45`) : null;
    if (fake && !Number.isNaN(fake.getTime())) offset = fake.getTime() - Date.now();
  }
  return () => new Date(Date.now() + offset);
}
