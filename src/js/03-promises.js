import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('form'),
};

const onFulfill = success => {
  Notiflix.Notify.success(`✅ ${success}`);
};

const onReject = reject => {
  Notiflix.Notify.failure(`❌ ${reject}`);
};

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Fulfilled promise ${position} in ${delay} ms`);
      } else {
        reject(`Rejected promise ${position} in ${delay} ms`);
      }
    }, delay);
  });
};

const handleSubmit = event => {
  event.preventDefault();
  const amount = event.currentTarget.elements.amount.value;
  const step = parseInt(event.currentTarget.elements.step.value);
  const delay = parseInt(event.currentTarget.elements.delay.value);

  const promises = [];

  const interval = setInterval(() => {
    promises.push(createPromise(amount, delay).then(onFulfill).catch(onReject));
  }, step);

  Promise.all(promises);
  console.log(promises);
  // promise.then(onFulfill, onReject);
};

refs.form.addEventListener('submit', handleSubmit);
