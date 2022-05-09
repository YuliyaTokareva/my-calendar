import { getItem, setItem } from "../common/storage.js";
import { renderWeek } from "../calendar/calendar.js";
import { renderHeader } from "../calendar/header.js";
import { getStartOfWeek, getDisplayedMonth } from "../common/time.utils.js";

const navElem = document.querySelector(".navigation");
const displayedMonthElem = document.querySelector(
    ".navigation__displayed-month"
);
const newWek = document.querySelector(".navigation__nav-icon");
const newWekIcon = document.querySelector(".fas");
function renderCurrentMonth() {
    // отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
    // вставить в .navigation__displayed-month
    displayedMonthElem.innerHTML = `${getDisplayedMonth(
        getItem(`displayedWeekStart`)
    )}`;
}

const onChangeWeek = (event) => {
    // при переключении недели обновите displayedWeekStart в storage
    // и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)
    const targetButton = event.target.getAttribute("data-direction");
    const targetButtonIcon =
        event.target.parentNode.getAttribute("data-direction");
    let dateToChange;
    if (targetButton === `next` || targetButtonIcon === `next`) {
        dateToChange = getItem(`displayedWeekStart`).setDate(
            getItem(`displayedWeekStart`).getDate() + 7
        );
    }
    if (targetButton === `prev` || targetButtonIcon === `prev`) {
        dateToChange = getItem(`displayedWeekStart`).setDate(
            getItem(`displayedWeekStart`).getDate() - 7
        );
    }

    setItem(`displayedWeekStart`, new Date(dateToChange));
    renderHeader();
    renderWeek();
    renderCurrentMonth();
};

export const initNavigation = () => {
    renderCurrentMonth();
    navElem.addEventListener("click", onChangeWeek);
};

//deleteEventBtn.addEventListener("click", onDeleteEvent);

// newWek.addEventListener("click", onChangeWeek);
// newWekIcon.addEventListener("click", onChangeWeek);
