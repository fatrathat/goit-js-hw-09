const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let intervalId = null;

// Отримуємо рандомний колір у hex-форматі
const changeBackgroundColor = () => {
  refs.body.style.backgroundColor = getRandomHexColor();
};

// Старт зміни кольору
const startChangeColor = () => {
  refs.startBtn.disabled = true;
  intervalId = setInterval(changeBackgroundColor, 1000);
  console.log('Старт інтервала з id:', intervalId);
};

// Стоп зміни кольору
const stopChangeColor = () => {
  if (intervalId !== null) {
    clearInterval(intervalId);
    refs.startBtn.disabled = false;
    console.log('Стоп інтервала з id:', intervalId);
    intervalId = null;
  } else alert('Зміна кольору не запущена');
};

refs.startBtn.addEventListener('click', startChangeColor);
refs.stopBtn.addEventListener('click', stopChangeColor);
