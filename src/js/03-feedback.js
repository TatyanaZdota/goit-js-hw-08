import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const storageKey = 'feedback-form-state';
const formData = {};

formEl.addEventListener('input', throttle(onFormInput), 500);
formEl.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(storageKey, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  const { email, message } = event.currentTarget.elements;

  if (email.value.length < 1 || message.value.length < 1) {
    alert('All fields must be filled!');
  }
  const data = {
    email: email.value,
    message: message.value,
  };
  console.log(data);
  event.currentTarget.reset();
  localStorage.removeItem(storageKey);
}

function localText() {
  const savedMessage = localStorage.getItem(storageKey);
  if (savedMessage) {
    const dataParse = JSON.parse(savedMessage);
    formData.email = dataParse.email || '';
    formData.message = dataParse.message || '';
    formEl[0].value = dataParse.email || '';
    formEl[1].value = dataParse.message || '';
  }
}
localText();
