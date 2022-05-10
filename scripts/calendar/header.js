import { getItem } from "../common/storage.js";
import { generateWeekRange } from "../common/time.utils.js";
import { openModal } from "../common/modal.js";

const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const weekElem = document.querySelector(".create-event-btn");

export const renderHeader = () => {
    // на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
    // на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
    // полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
    // в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка

    const time = getItem(`displayedWeekStart`);
    const arrWeek = generateWeekRange(time);
    const findHeader = document.querySelector(".calendar__header");
    const dayTheWeekArr = arrWeek.map((day) => [
        daysOfWeek[day.getDay()],
        day.getDate(),
    ]);
    const getDayInHeader = dayTheWeekArr
        .map(
            (dayNumber) => `
           <div
            class="calendar__day-label">
            <span class ="day-label__day-name">${dayNumber[0]}</span> 
            <span class ="day-label__day-number">${dayNumber[1]}</span>
            </div>`
        )
        .join("");
    console.log(dayTheWeekArr);
    findHeader.innerHTML = getDayInHeader;
};

// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик
const createEventElementButton = (event) => {
    openModal();
};
weekElem.addEventListener("click", createEventElementButton);
