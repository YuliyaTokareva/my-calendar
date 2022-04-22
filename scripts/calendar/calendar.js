import { getItem } from "../common/storage.js";
import { generateWeekRange } from "../common/time.utils.js";
import { renderEvents } from "../events/events.js";
import { createNumbersArray } from "../common/createNumbersArray.js";

//import { generateWeekRange } from "../common/time.utils";

const generateDay = () => {
    // функция должна сгенерировать и вернуть разметку дня в виде строки
    // разметка состоит из 24 часовых временных слотов (.calendar__time-slot)
    return createNumbersArray(1, 24)
        .map(
            (timeNumber) => `
          <div
          class="calendar__time-slot"
          data-time="${timeNumber}"></div>`
        )
        .join("");
};

export const renderWeek = () => {
    // функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
    // разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
    // массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
    // каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
    // после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents
    const findWeek = document.querySelector(".calendar__week");
    const time = getItem(`displayedWeekStart`);
    const arrWeek = generateWeekRange(time);
    const getTime = generateDay();
    const dayTheWeekArr = arrWeek.map((day) => day.getDate());
    const getWeek = dayTheWeekArr
        .map(
            (dayNumber) => `
           <div
            class="calendar__day"
            data-day="${dayNumber}">${getTime}</div>`
        )
        .join("");
    findWeek.innerHTML = getWeek;
    // console.log(arrWeek.map((day) => day.getDate()));
};
