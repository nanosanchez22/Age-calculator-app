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

function calculateAge() {
  const date = new Date();

  let yearsOld = 0;
  let monthsOld = 0;
  let daysOld = 0;

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (dayInput.value > day && monthInput.value > month) {
    daysOld = day - dayInput.value + 30;
    monthsOld = month - monthInput.value + 11;
    yearsOld = year - yearInput.value - 1;
  } else if (dayInput.value > day) {
    daysOld = day - dayInput.value + 30;
    monthsOld = month - monthInput.value;
    yearsOld = year - yearInput.value;
  } else if (monthInput.value > month) {
    daysOld = day - dayInput.value;
    monthsOld = month - monthInput.value + 11;
    yearsOld = year - yearInput.value -1;
  } else {
    daysOld = day - dayInput.value;
    monthsOld = month - monthInput.value;
    yearsOld = year - yearInput.value;
  }

  animateCounter(yearOutput, yearsOld);
  animateCounter(monthOutput, monthsOld);
  animateCounter(dayOutput, daysOld);
}

function animateCounter(element, targetNumber) {
  element.style.opacity = "0";

  let currentNumber = 0;
  const interval = setInterval(() => {
    currentNumber++;
    element.innerText = currentNumber;
    element.style.opacity = "1";

    if (currentNumber === targetNumber) {
      clearInterval(interval);
    }
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
