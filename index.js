const dayInput = document.getElementById("input__day");
const monthInput = document.getElementById("input__month");
const yearInput = document.getElementById("input__year");

const dayOutput = document.getElementById("span__day");
const monthOutput = document.getElementById("span__month");
const yearOutput = document.getElementById("span__year");

const labelDay = document.getElementById("label--day");
const labelMonth = document.getElementById("label--month");
const labelYear = document.getElementById("label--year");

const errorDay = document.getElementById("error--day");
const errorMonth = document.getElementById("error--month");
const errorYear = document.getElementById("error--year");

const btn = document.getElementById("arrow--btn");
console.log(dayInput);

btn.addEventListener("click", function () {
  checkErrors();
});

function getAge(year, month, day) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  let yearsOld = currentYear - year;
  let monthsOld = currentMonth - month;
  let daysOld = currentDay - day;

  if (currentMonth < month || (currentMonth === month && currentDay < day)) {
    yearsOld--;
    monthsOld += 12;
  }

  if (currentDay < day) {
    const daysInPreviousMonth = new Date(
      currentYear,
      currentMonth - 1,
      0
    ).getDate();
    monthsOld--;
    daysOld += daysInPreviousMonth;
  }

  return { years: yearsOld, months: monthsOld, days: daysOld };
}

function calculateAge() {
  const dayInputValue = parseInt(dayInput.value);
  const monthInputValue = parseInt(monthInput.value);
  const yearInputValue = parseInt(yearInput.value);

  const age = getAge(yearInputValue, monthInputValue, dayInputValue);

  animateCounter(yearOutput, age.years);
  animateCounter(monthOutput, age.months);
  animateCounter(dayOutput, age.days);
}

function animateCounter(element, targetNumber) {
  element.style.opacity = "0";

  let currentNumber = 0;
  const increment = Math.ceil(targetNumber / 100); // Adjust the increment for smoother animation

  const interval = setInterval(() => {
    currentNumber += increment;
    if (currentNumber > targetNumber) {
      currentNumber = targetNumber;
      clearInterval(interval);
    }
    element.innerText = currentNumber;
    element.style.opacity = "1";
  }, 20); // Delay between number increments in milliseconds
}

function checkErrors() {
  let run = true;
  const date = new Date();
  const day = Number(dayInput.value);
  const month = Number(monthInput.value);
  const year = Number(yearInput.value);

  if (dayInput.value == "") {
    errorDay.innerText = "This field is required";
    labelDay.style.color = "hsl(0, 100%, 67%)";
    dayInput.style.borderColor = "hsl(0, 100%, 67%)";
    run = false;
  }

  // Reset error messages and styles
  errorDay.innerText = "";
  errorMonth.innerText = "";
  errorYear.innerText = "";
  labelDay.style.color = "";
  labelMonth.style.color = "";
  labelYear.style.color = "";
  dayInput.style.borderColor = "";
  monthInput.style.borderColor = "";
  yearInput.style.borderColor = "";

  if (dayInput.value == "") {
    errorDay.innerText = "This field is required";
    labelDay.style.color = "hsl(0, 100%, 67%)";
    dayInput.style.borderColor = "hsl(0, 100%, 67%)";
    run = false;
  } else if (day < 1 || day > 31) {
    errorDay.innerText = "Invalid day";
    labelDay.style.color = "hsl(0, 100%, 67%)";
    dayInput.style.borderColor = "hsl(0, 100%, 67%)";
    run = false;
  }
  if (monthInput.value == "") {
    errorMonth.innerText = "This field is required";
    labelMonth.style.color = "hsl(0, 100%, 67%)";
    monthInput.style.borderColor = "hsl(0, 100%, 67%)";
    run = false;
  } else if (month < 1 || month > 12) {
    errorMonth.innerText = "Invalid month";
    labelMonth.style.color = "hsl(0, 100%, 67%)";
    monthInput.style.borderColor = "hsl(0, 100%, 67%)";
    run = false;
  }
  if (yearInput.value == "") {
    errorYear.innerText = "This field is required";
    labelYear.style.color = "hsl(0, 100%, 67%)";
    yearInput.style.borderColor = "hsl(0, 100%, 67%)";
    run = false;
  } else if (year >= date.getFullYear()) {
    errorYear.innerText = "Invalid year";
    labelYear.style.color = "hsl(0, 100%, 67%)";
    yearInput.style.borderColor = "hsl(0, 100%, 67%)";
    run = false;
  }

  if (run == true) {
    calculateAge();
  }
}
