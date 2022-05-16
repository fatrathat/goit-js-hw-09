import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
};

let selectDay = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      alert('Please choose a date in the future!');
      selectedDates[0] = options.defaultDate;
      refs.btnStart.disabled = true;
    } else {
      selectDay = selectedDates[0];
      refs.btnStart.disabled = false;
    }
  },
};

const selectDate = flatpickr(refs.input, options);
refs.btnStart.disabled = 'true';

const convertMs = ms => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = value => {
  return value.padStart(2, 0);
};

const initializeTimer = () => {
  const days = document.querySelector('[data-days]');
  const hours = document.querySelector('[data-hours]');
  const minutes = document.querySelector('[data-minutes]');
  const seconds = document.querySelector('[data-seconds]');

  const updateTimer = () => {
    const ms = convertMs(selectDay.getTime() - options.defaultDate.getTime());

    days.innerHTML = addLeadingZero(ms.days.toString());
    hours.innerHTML = addLeadingZero(ms.hours.toString());
    minutes.innerHTML = addLeadingZero(ms.minutes.toString());
    seconds.innerHTML = addLeadingZero(ms.seconds.toString());

    if (ms <= 0) {
      clearInterval(timeinterval);
    }
  };

  updateTimer();
  const timeinterval = setInterval(updateTimer, 1000);
};

refs.btnStart.addEventListener('click', initializeTimer);
