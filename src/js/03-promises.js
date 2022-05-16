const refs = {
  form: document.querySelector('form'),
};

function createPromise(position, delay) {
  const myPromise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
      resolve('Success! Value passed to resolve function');
    } else {
      // Reject
      reject('Error! Error passed to reject function');
    }
  });
}

const handleSubmit = event => {
  event.preventDefault();
  createPromise();
};

refs.form.addEventListener('submit', handleSubmit);
