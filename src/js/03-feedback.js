import _, { throttle } from "lodash";

const form = document.querySelector("form");
const emailEl = document.querySelector('input[name="email"]');
const messageEl = document.querySelector('textarea[name="message"]');

const savedData = JSON.parse(localStorage.getItem("feedback-form-state"));

const data = {
  email: "",
  message: "",
};

const saveData = () => {
  data.email = emailEl.value;
  data.message = messageEl.value;

  localStorage.setItem("feedback-form-state", JSON.stringify(data));
};

const updateData = () => {
  if (savedData) {
    emailEl.value = savedData.email;
    messageEl.value = savedData.message;
    data.email = savedData.email;
    data.message = savedData.message;
  } else {
    emailEl.value = "";
    messageEl.value = "";
  }
};

const clearData = (e) => {
  e.preventDefault();
  console.log(data);
  form.reset();
  localStorage.clear();
};

updateData();
form.addEventListener("input", throttle(saveData, 500));
form.addEventListener("submit", clearData);
