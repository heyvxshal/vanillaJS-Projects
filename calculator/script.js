const display = document.getElementById("display");
const operators = document.querySelectorAll(".buttons");

let work = true;

const action = function (inp) {
  console.log(display.value);
  display.value += inp;
  display.scrollLeft = display.scrollWidth;
};

const clearDisplay = function () {
  display.value = "";
};

const calculate = function () {
  try {
    display.value = eval(display.value);
  } catch (err) {
    display.value = "Error";
  }
};
