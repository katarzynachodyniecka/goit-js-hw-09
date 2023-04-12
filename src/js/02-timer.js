import Notiflix from 'notiflix';

Notiflix.Notify.success('Sol lucet omnibus');

Notiflix.Notify.failure('Qui timide rogat docet negare');

// e.g. Message with callback, and the new options
Notiflix.Notify.success(
  'Click Me',
  function cb() {
    // callback
  },
  {
    timeout: 4000,
  }
);
