import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
const formData = {};

formEl.addEventListener('input', throttle(onFormInput), 500);
formEl.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  const { email, message } = event.currentTarget.elements;
  if (email.value.length < 1 || message.value.length < 1) {
    alert('All fields must be filled!');
  }
  console.log(formData);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function localText() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    const dataParse = JSON.parse(savedMessage);
    formData.email = dataParse.email || '';
    formData.message = dataParse.message || '';
    formEl[0].value = dataParse.email || '';
    formEl[1].value = dataParse.message || '';
  }
}
localText();
