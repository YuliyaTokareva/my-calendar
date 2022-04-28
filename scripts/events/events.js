import { getItem, setItem } from "../common/storage.js";
import shmoment from "../common/shmoment.js";
import { openPopup, closePopup } from "../common/popup.js";
import { storage, dateNow } from "../common/storage.js";
import { generateWeekRange } from "../common/time.utils.js";

const weekElem = document.querySelector(".calendar__week");
const deleteEventBtn = document.querySelector(".delete-event-btn");

const calendarWeek = document.querySelector(".calendar__week");
function handleEventClick(event) {
    // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
    // установите eventIdToDelete с id события в storage
    // openPopup(event.clientX, event.clientY);
}

function removeEventsFromCalendar() {
    // ф-ция для удаления всех событий с календаря
}

const createEventElement = (event) => {
    // ф-ция создает DOM элемент события
    // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
    // нужно добавить id события в дата атрибут
    // здесь для создания DOM элемента события используйте document.createElement
    const targetTime = event.target;
    const idEvent = Math.floor(Math.random() * (4000456000 - 456000)) + 456000;
    const addDuvEvent = document.createElement("div");
    addDuvEvent.classList.add("event");
    addDuvEvent.setAttribute("data-event-Id", `${idEvent}`);

    addDuvEvent.innerText = "Text";
    targetTime.prepend(addDuvEvent);
    console.log(event.target);
};

calendarWeek.addEventListener("click", createEventElement);
export const renderEvents = () => {
    // достаем из storage все события и дату понедельника отображаемой недели
    // фильтруем события, оставляем только те, что входят в текущую неделю
    // создаем для них DOM элементы с помощью createEventElement
    // для каждого события находим на странице временную ячейку (.calendar__time-slot)
    // и вставляем туда событие
    // каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
    // не забудьте удалить с календаря старые события перед добавлением новых
    const mondayNow = getItem(`displayedWeekStart`);
    const arrWeek = generateWeekRange(mondayNow);

    const eventsFilter = [];
    const allEventsToWeak = getItem(`events`).filter((events) => {
        events.start === arrWeek;
        // console.log(events.start === arrWeek);
    });

    //console.log([1, 2, 3].filter((el) => el === 1));
    console.log(mondayNow);
    console.log(storage);
    // console.log(getStartOfWeek(dateNow));
};
renderEvents();
function onDeleteEvent() {
    // достаем из storage массив событий и eventIdToDelete
    // удаляем из массива нужное событие и записываем в storage новый массив
    // закрыть попап
    // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
}

deleteEventBtn.addEventListener("click", onDeleteEvent);

weekElem.addEventListener("click", handleEventClick);
