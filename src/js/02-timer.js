import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let selectDay = null;

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future!');
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
  const daysContent = document.querySelector('[data-days]');
  const hoursContent = document.querySelector('[data-hours]');
  const minutesContent = document.querySelector('[data-minutes]');
  const secondsContent = document.querySelector('[data-seconds]');

  setInterval(() => {
    let now = new Date();
    const { days, hours, minutes, seconds } = convertMs(selectDay - now);

    daysContent.innerHTML = addLeadingZero(days.toString());
    hoursContent.innerHTML = addLeadingZero(hours.toString());
    minutesContent.innerHTML = addLeadingZero(minutes.toString());
    secondsContent.innerHTML = addLeadingZero(seconds.toString());
  }, 1000);
};

refs.btnStart.addEventListener('click', initializeTimer);
