/* =============================================
   Learn Thai with Mind — Booking Calendar
   ============================================= */

const AVAILABLE_DAYS = [1, 2, 3, 4, 5]; // Mon-Fri
const BOOKED_DATES   = ['2026-05-15', '2026-05-20', '2026-05-27', '2026-06-03'];
const TIME_SLOTS     = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const TAKEN_TIMES    = { '2026-05-19': ['09:00', '10:00'], '2026-05-21': ['14:00', '15:00'] };

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
  const takenForDay = (TAKEN_TIMES[selectedDate] || []);

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
  renderCalendar();
}

function nextMonth() {
  viewMonth++;
  if (viewMonth > 11) { viewMonth = 0; viewYear++; }
  renderCalendar();
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
  renderCalendar();

  document.getElementById('cal-prev')?.addEventListener('click', prevMonth);
  document.getElementById('cal-next')?.addEventListener('click', nextMonth);
  document.getElementById('booking-form')?.addEventListener('submit', handleBookingSubmit);
});
