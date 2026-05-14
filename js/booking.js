/* =============================================
   Learn Thai with Mind — Booking Calendar
   ============================================= */

const AVAILABLE_DAYS = [1, 2, 3, 4, 5]; // Mon-Fri
const BOOKED_DATES   = ['2026-05-15', '2026-05-20', '2026-05-27', '2026-06-03'];
const TIME_SLOTS     = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
const TAKEN_TIMES    = { '2026-05-19': ['10:00', '11:00'], '2026-05-21': ['14:00', '15:00'] };

/* ── Google Calendar FreeBusy Integration ──────────────────────────────────
 *
 *  To enable real-time availability from your Google Calendar:
 *
 *  1. Go to https://console.cloud.google.com/ → create a project
 *  2. Enable "Google Calendar API"
 *  3. Create an API key (APIs & Services → Credentials → Create Credentials)
 *  4. Restrict the key to "Google Calendar API" and your domain
 *  5. In Google Calendar settings for learnthaiwithmind@gmail.com:
 *       → Share with specific people → make it "See only free/busy" (no names)
 *       → OR: Settings → Access permissions → "See only free/busy information"
 *  6. Paste your API key below:
 *
 * ─────────────────────────────────────────────────────────────────────────── */
const GOOGLE_CALENDAR_API_KEY  = '';          // ← paste your API key here
const GOOGLE_CALENDAR_ID       = 'learnthaiwithmind@gmail.com';
const CALENDAR_TIMEZONE        = 'Asia/Bangkok';

/**
 * Fetch busy slots from Google Calendar FreeBusy API for a given month.
 * Returns a Map<dateKey, Set<'HH:MM'>> of busy time strings.
 * If API key is empty, returns an empty Map (falls back to local TAKEN_TIMES).
 */
async function fetchGoogleBusy(year, month) {
  if (!GOOGLE_CALENDAR_API_KEY) return new Map();

  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month + 1, 0, 23, 59, 59);

  const body = JSON.stringify({
    timeMin: firstDay.toISOString(),
    timeMax: lastDay.toISOString(),
    timeZone: CALENDAR_TIMEZONE,
    items: [{ id: GOOGLE_CALENDAR_ID }]
  });

  try {
    const res  = await fetch(
      `https://www.googleapis.com/calendar/v3/freeBusy?key=${GOOGLE_CALENDAR_API_KEY}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body }
    );
    const data = await res.json();
    const busy = data.calendars?.[GOOGLE_CALENDAR_ID]?.busy || [];

    const busyMap = new Map();
    busy.forEach(({ start, end }) => {
      // Convert to Bangkok time and mark every slot hour that overlaps
      const s = new Date(start);
      const e = new Date(end);
      // Iterate hour by hour in Bangkok time (UTC+7)
      const cur = new Date(s);
      while (cur < e) {
        const bkk   = new Date(cur.toLocaleString('en-US', { timeZone: CALENDAR_TIMEZONE }));
        const dk    = `${bkk.getFullYear()}-${pad(bkk.getMonth()+1)}-${pad(bkk.getDate())}`;
        const hhmm  = `${pad(bkk.getHours())}:00`;
        if (!busyMap.has(dk)) busyMap.set(dk, new Set());
        busyMap.get(dk).add(hhmm);
        cur.setHours(cur.getHours() + 1);
      }
    });
    return busyMap;
  } catch (err) {
    console.warn('Google Calendar fetch failed, using local data only.', err);
    return new Map();
  }
}

// Merged busy cache (refreshed when month changes)
let googleBusyCache = new Map();

let viewYear    = 2026;
let viewMonth   = 4; // 0-indexed, so 4 = May
let selectedDate = null;
let selectedTime = null;

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

function pad(n) { return String(n).padStart(2, '0'); }

function dateKey(y, m, d) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}

function isBooked(y, m, d) {
  return BOOKED_DATES.includes(dateKey(y, m, d));
}

function isAvailable(y, m, d) {
  const dt = new Date(y, m, d);
  return AVAILABLE_DAYS.includes(dt.getDay());
}

function isPast(y, m, d) {
  const today = new Date(); today.setHours(0,0,0,0);
  return new Date(y, m, d) < today;
}

async function refreshAndRender() {
  googleBusyCache = await fetchGoogleBusy(viewYear, viewMonth);
  renderCalendar();
}

function renderCalendar() {
  const header = document.getElementById('cal-month-header');
  const grid   = document.getElementById('cal-days');
  if (!header || !grid) return;

  header.textContent = `${MONTH_NAMES[viewMonth]} ${viewYear}`;
  grid.innerHTML = '';

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const today = new Date();

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    empty.className = 'cal-day empty';
    grid.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement('div');
    const key  = dateKey(viewYear, viewMonth, d);
    const isT  = today.getDate() === d && today.getMonth() === viewMonth && today.getFullYear() === viewYear;

    if (isPast(viewYear, viewMonth, d)) {
      cell.className = 'cal-day booked';
    } else if (isBooked(viewYear, viewMonth, d) || !isAvailable(viewYear, viewMonth, d)) {
      cell.className = 'cal-day booked';
    } else {
      cell.className = 'cal-day available';
      if (selectedDate === key) cell.classList.add('selected');
      cell.addEventListener('click', () => selectDate(key, cell));
    }
    if (isT) cell.classList.add('today');
    cell.textContent = d;
    grid.appendChild(cell);
  }
}

function selectDate(key, cell) {
  selectedDate = key;
  selectedTime = null;
  document.querySelectorAll('.cal-day.selected').forEach(c => c.classList.remove('selected'));
  cell.classList.add('selected');
  renderTimeSlots();
  document.getElementById('selected-date-display').textContent =
    new Date(key + 'T12:00:00').toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  const tsArea = document.getElementById('time-slots-area');
  if (tsArea) tsArea.style.display = 'block';
}

function renderTimeSlots() {
  const slotsGrid = document.getElementById('slots-grid');
  if (!slotsGrid) return;
  slotsGrid.innerHTML = '';
  // Merge local TAKEN_TIMES with Google Calendar busy slots
  const localTaken  = TAKEN_TIMES[selectedDate] || [];
  const googleTaken = googleBusyCache.has(selectedDate)
    ? [...googleBusyCache.get(selectedDate)]
    : [];
  const takenForDay = [...new Set([...localTaken, ...googleTaken])];

  TIME_SLOTS.forEach(time => {
    const el = document.createElement('div');
    const isTaken = takenForDay.includes(time);
    el.className = isTaken ? 'slot taken' : 'slot';
    el.textContent = time;
    if (!isTaken) {
      el.addEventListener('click', () => {
        selectedTime = time;
        document.querySelectorAll('.slot.selected').forEach(s => s.classList.remove('selected'));
        el.classList.add('selected');
        document.getElementById('booking-time-input').value = time;
        document.getElementById('booking-date-input').value = selectedDate;
      });
    }
    slotsGrid.appendChild(el);
  });
}

function prevMonth() {
  viewMonth--;
  if (viewMonth < 0) { viewMonth = 11; viewYear--; }
  refreshAndRender();
}

function nextMonth() {
  viewMonth++;
  if (viewMonth > 11) { viewMonth = 0; viewYear++; }
  refreshAndRender();
}

// ── Booking form submit ──
function handleBookingSubmit(e) {
  e.preventDefault();
  if (!selectedDate || !selectedTime) {
    showToast('⚠ Please select a date and time first.');
    return;
  }

  const form = document.getElementById('booking-form');
  const successEl = document.getElementById('booking-success');

  form.style.display = 'none';
  if (successEl) {
    successEl.classList.add('show');
    const name = document.getElementById('booking-name').value.split(' ')[0];
    document.getElementById('success-name').textContent = name;
    document.getElementById('success-date').textContent =
      new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
    document.getElementById('success-time').textContent = selectedTime;
  }
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  refreshAndRender(); // fetch Google busy slots then draw calendar

  document.getElementById('cal-prev')?.addEventListener('click', prevMonth);
  document.getElementById('cal-next')?.addEventListener('click', nextMonth);
  document.getElementById('booking-form')?.addEventListener('submit', handleBookingSubmit);
});
