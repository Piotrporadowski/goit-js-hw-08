'use strict';
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = "feedback-form-state";

let formState = {
    email: '',
    message: ''
};

const checkStorage = localStorage.getItem(LOCALSTORAGE_KEY);
if (checkStorage) {
    formState = JSON.parse(checkStorage);
    form.elements.email.value = formState.email;
    form.elements.message.value = formState.message;
}

const throttledSave = throttle((data) => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
}, 500);

function saveData(evt) {
    formState[evt.target.name] = evt.target.value;
    throttledSave(formState);
}
form.addEventListener("input", saveData);

const sentForm = eventSent => {
    eventSent.preventDefault();
    const {
        elements: { email, message },
    } = eventSent.currentTarget;

    const emailValue = email.value.trim(); // Usuń białe znaki z początku i końca
    const messageValue = message.value.trim();

    if (!emailValue || !messageValue) {
        alert("Proszę wypełnić wszystkie pola formularza.");
        return; // Przerywa funkcję, jeśli pola są puste
    }

    const objectData = {
        email: emailValue,
        message: messageValue,
    };

    console.log(objectData);
    localStorage.removeItem(LOCALSTORAGE_KEY);
    formState = {
        email: '',
        message: ''
    };
    form.reset();
}
form.addEventListener('submit', sentForm);
