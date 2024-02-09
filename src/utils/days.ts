export const shortDaysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
export const displayedShortDaysOfWeek = [
  "Пн",
  "Вт",
  "Ср",
  "Чт",
  "Пт",
  "Сб",
  "Вс",
];

export const fullDaysOfWeek = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

export const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const shortMonthNames = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Май",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек",
];

export const monthNamesSecondary = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

// Получаем текущую дату
export const currentDate = new Date();
export const currentYear = currentDate.getFullYear();
export const currentMonth = currentDate.getMonth();
export const currentMonthName = monthNames[currentDate.getMonth()];
export const currentMonthNameSecondary =
  monthNamesSecondary[currentDate.getMonth()];

// Получаем номер первого дня недели текущего месяца
export const firstDayOfWeek = getFirstDayOfMonth(currentYear, currentMonth);

// Получаем все дни текущего месяца
export const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);

export function getDaysInMonth(year: number, month: number) {
  const date = new Date(year, month + 1, 0);
  const daysInMonth = date.getDate();

  const daysArray = [];
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  return daysArray;
}

export function getFirstDayOfMonth(year: number, month: number) {
  const firstDayOfMonth = new Date(year, month, 1);
  return firstDayOfMonth.getDay();
}

export function getCurrentDayOfWeek(daysOfWeek: string[]) {
  const currentDayOfWeek = daysOfWeek[currentDate.getDay()];

  return currentDayOfWeek;
}

export const formatDate = (date: Date): string => {
  let dd: string | number = date.getDate();
  if (dd < 10) dd = "0" + dd;

  let mm: string | number = date.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;

  let yy: string | number = date.getFullYear();
  if (yy < 1000) yy = "0" + yy;

  let hours: string | number = date.getHours();
  if (hours < 10) hours = "0" + hours;

  let minutes: string | number = date.getMinutes();
  if (minutes < 10) minutes = "0" + minutes;

  let seconds: string | number = date.getSeconds();
  if (seconds < 10) seconds = "0" + seconds;

  return `${dd}.${mm}.${yy} (${hours}:${minutes}:${seconds})`;
};
