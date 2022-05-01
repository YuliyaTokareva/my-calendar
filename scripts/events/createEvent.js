import { getItem, setItem } from "../common/storage.js";
import { renderEvents } from "./events.js";
import { getDateTime } from "../common/time.utils.js";
import { closeModal } from "../common/modal.js";
import { storage } from "../common/storage.js";

export const eventFormElem = document.querySelector(".event-form");
const allEventInputsElem = document.querySelectorAll(".event-form__field");
const modalCloceButtonElem = document.querySelector(".create-event__close-btn");
const submitBtmElem = document.querySelector(".event-form__submit-btn");

//const eventInputsElem = document.querySelector(".event-form__fieldd");

function clearEventForm() {
    // ф-ция должна очистить поля формы от значений
    const clearInput = [...allEventInputsElem].forEach((el) => (el.value = ""));
}

function onCloseEventForm() {
    //здесь нужно закрыть модальное окно и очистить форму
    clearEventForm();
    closeModal();
}

function onCreateEvent(event) {
    // задача этой ф-ции только добавить новое событие в массив событий, что хранится в storage
    // создавать или менять DOM элементы здесь не нужно. Этим займутся другие ф-ции
    // при подтверждении формы нужно считать данные с формы
    // с формы вы получите поля date, startTime, endTime, title, description
    // на основе полей date, startTime, endTime нужно посчитать дату начала и окончания события
    // date, startTime, endTime - строки. Вам нужно с помощью getDateTime из утилит посчитать start и end объекта события
    // полученное событие добавляем в массив событий, что хранится в storage
    // закрываем форму
    // и запускаем перерисовку событий с помощью renderEvents
    event.preventDefault();
    const formFields = [...new FormData(eventFormElem)];
    const eventNew = {};
    eventNew.id = Math.floor(Math.random() * (4000456000 - 456000)) + 456000;
    eventNew.title = formFields[0][1];
    eventNew.description = formFields[4][1];
    eventNew.start = getDateTime(formFields[1][1], formFields[2][1]);
    eventNew.end = getDateTime(formFields[1][1], formFields[3][1]);
    storage.events.push(eventNew);
    onCloseEventForm();

    renderEvents();
    //console.log(renderEvents());
}

export function initEventForm() {
    // подпишитесь на сабмит формы и на закрытие формы

    submitBtmElem.addEventListener("click", onCreateEvent);
    console.log(storage);
}

modalCloceButtonElem.addEventListener("click", onCloseEventForm);
submitBtmElem.addEventListener("click", initEventForm);
