import { getItem, setItem } from "../common/storage.js";
import shmoment from "../common/shmoment.js";
import { openPopup, closePopup } from "../common/popup.js";
import { storage, dateNow } from "../common/storage.js";
import { generateWeekRange } from "../common/time.utils.js";
import { openModal } from "../common/modal.js";
import { eventFormElem } from "../events/createEvent.js";

const weekElem = document.querySelector(".calendar__week");
const deleteEventBtn = document.querySelector(".delete-event-btn");
const calendarTimeSlot = document.querySelectorAll(`[data-event-id]`);
//const calendarWeek = document.querySelector(".calendar__week");
function handleEventClick(event) {
    // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
    // установите eventIdToDelete с id события в storage
    console.log(calendarTimeSlot);
    openPopup(event.clientX, event.clientY);
}

function removeEventsFromCalendar() {
    // ф-ция для удаления всех событий с календаря
    const eventArr = getItem(`events`);
    //const findIdOldEvents = eventArr.;
    eventArr.forEach((element) => {
        let findOldEvent = document.querySelector(
            `div[data-event-id = "${element.id}"]`
        );
        if (element.length === 0) {
            return;
        }
        // findOldEvent.innerHTML = "";
    });
}

const createEventElement = (event) => {
    // ф-ция создает DOM элемент события
    // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
    // нужно добавить id события в дата атрибут
    // здесь для создания DOM элемента события используйте document.createElement
    const findDay = event.start.getDate();
    const getHour = event.start.getHours();
    const targetTime = document.querySelector(
        `[data-day = "${findDay}"] div[data-time = "${getHour}"]`
    );
    const heightStyle =
        event.end.getHours() * 60 +
        event.end.getMinutes() -
        (event.start.getHours() * 60 + event.start.getMinutes());
    const addDivEvent = document.createElement("div");
    addDivEvent.classList.add("event");
    addDivEvent.setAttribute("data-event-Id", `${event.id}`);
    addDivEvent.setAttribute(
        "style",
        `top:${event.start.getMinutes()}px; height:${heightStyle}px`
    );
    addDivEvent.innerHTML = `
           <div
            class="event__title">
            ${event.title}
            </div>
            <div
            class="event__time">
            ${event.start.getHours()} : ${event.start.getMinutes()}  —  ${event.end.getHours()}: ${event.end.getMinutes()}
            
            </div>`;

    targetTime.prepend(addDivEvent);
    console.log(calendarTimeSlot);
};

//calendarWeek.addEventListener("click", createEventElement);
export const renderEvents = () => {
    // достаем из storage все события и дату понедельника отображаемой недели
    // фильтруем события, оставляем только те, что входят в текущую неделю
    // создаем для них DOM элементы с помощью createEventElement
    // для каждого события находим на странице временную ячейку (.calendar__time-slot)
    // и вставляем туда событие
    // каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
    // не забудьте удалить с календаря старые события перед добавлением новых
    const startDateTime = getItem(`displayedWeekStart`);
    const arrWeek = generateWeekRange(startDateTime);
    const endDateTime = arrWeek[6];
    const eventArr = getItem(`events`);
    //console.log(eventArr);
    const filterEvants = eventArr.filter((event) => {
        return event.start >= startDateTime && event.end < endDateTime;
    });

    removeEventsFromCalendar();
    filterEvants.forEach((element) => {
        removeEventsFromCalendar();
        createEventElement(element);
    });

    //console.log(filterEvants);
    //console.log(endDateTime);
    // console.log(getStartOfWeek(dateNow));
};
console.log(calendarTimeSlot);
function onDeleteEvent() {
    // достаем из storage массив событий и eventIdToDelete
    // удаляем из массива нужное событие и записываем в storage новый массив
    // закрыть попап
    // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
}

deleteEventBtn.addEventListener("click", onDeleteEvent);

weekElem.addEventListener("click", handleEventClick);
