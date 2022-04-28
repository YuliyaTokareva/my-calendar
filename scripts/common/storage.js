import { getStartOfWeek } from "../common/time.utils.js";
export let storage = {
    // используется для удаления события
    eventIdToDelete: null,
    // хранит дату понедельника той отображаемой недели
    displayedWeekStart: null,
    // хранит массив всех событий
    events: [
        // {
        //     id: 3941144130,
        //     title: "1",
        //     description: "123",
        //     start: " Fri Apr 29 2022 03:22:53 GMT+0200 (Центральная Европа, летнее время)",
        //     end: " Fri Apr 29 2022 04:22:53 GMT+0200 (Центральная Европа, летнее время)",
        // },
        // {
        //     id: 1440790169,
        //     title: "2",
        //     description: "txt",
        //     start: "Mon Apr 25 2022 10:00:00 GMT+0200 (Центральная Европа, летнее время)",
        //     end: "Mon Apr 25 2022 11:00:00 GMT+0200 (Центральная Европа, летнее время)",
        // },
    ],
    // это все данные, которые вам нужно хранить для работы приложения
};
export const dateNow = new Date();
export const setItem = (key, value) => {
    // ф-ция должна устанавливать значения в объект storage
    storage[key] = value;
};
setItem(`displayedWeekStart`, dateNow);

export const getItem = (key) => {
    // ф-ция должна возвращать по ключу значения из объекта storage
    return storage[key];
};
//console.log(getItem(`events`));
// пример объекта события
const eventExample = {
    id: 0.7520027086457333, // id понадобится для работы с событиями
    title: "Title",
    description: "Some description",
    start: new Date("2020-03-17T01:10:00.000Z"),
    end: new Date("2020-03-17T04:30:00.000Z"),
};
