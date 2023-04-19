import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

btnEl.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (options.defaultDate <= selectedDates[0]) {
      btnEl.removeAttribute('disabled');
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnEl.setAttribute('disabled', '');
    }
  },
};
flatpickr(inputEl, options);

function convertMs(ms) {
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
}

const addLeadingZero = value => {
  if (value.toString().length === 1) {
    return value.toString().padStart(2, '0');
  }
  return value;
};
let pickedDate = null;
inputEl.addEventListener('input', e => {
  pickedDate = new Date(e.currentTarget.value).getTime();

  btnEl.addEventListener('click', () => {
    const countdown = setInterval(() => {
      const nowDateNumber = new Date().getTime();
      let timeRemaining = pickedDate - nowDateNumber;

      secondsEl.innerHTML = addLeadingZero(convertMs(timeRemaining).seconds);
      minutesEl.innerHTML = addLeadingZero(convertMs(timeRemaining).minutes);
      hoursEl.innerHTML = addLeadingZero(convertMs(timeRemaining).hours);
      daysEl.innerHTML = addLeadingZero(convertMs(timeRemaining).days);

      if (timeRemaining < 0) {
        clearInterval(countdown);
        secondsEl.innerHTML = addLeadingZero(0);
        minutesEl.innerHTML = addLeadingZero(0);
        hoursEl.innerHTML = addLeadingZero(0);
        daysEl.innerHTML = addLeadingZero(0);
        Notiflix.Notify.success(`Time's up! WELCOME!`);
      }
    }, 1000);
  });
});
