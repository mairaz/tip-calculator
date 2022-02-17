const totalBill = document.querySelector(".input_bill");
const totalPerson = document.querySelector(".input_person");
const btnTip = document.querySelectorAll(".btn_tips");
const personTip = document.querySelector(".splitter__result-person");
const totalTip = document.querySelector(".splitter__result-total");
const notification = document.querySelectorAll(".splitter__text span");
const customTip = document.querySelector(".custom-tip");
const resetBtn = document.querySelector(".btn_reset");

let percent;
let bill = 0;
let people = 0;

btnTip.forEach((e) => {
  e.addEventListener("click", function callback(e) {
    getPercentual(e);
  });
});

function getPercentual(e) {
  customTip.value = "";
  btnTip.forEach((item) => item.classList.remove("clicked"));
  const target = e.target.closest(".btn_tips");
  target.classList.add("clicked");
  percent = +target.textContent.replace(/\D/g, "");
  if (percent && people > 0 && !isNaN(people) && bill > 0 && !isNaN(bill)) {
    showResult();
  }
}

function addNotification(item, message) {
  console.log(item);
  item.classList.add("notification");
  item.textContent = message;
}

resetBtn.addEventListener("click", function (e) {
  totalBill.value = "";
  totalPerson.value = "";
  personTip.innerHTML = "R$ 0.00";
  totalTip.innerHTML = "R$ 0.00";
  btnTip.forEach((item) => item.classList.remove("clicked"));
  notification.forEach((item) => item.classList.remove("notification"));
  totalBill.classList.remove("active");
  totalPerson.classList.remove("active");
});

totalBill.addEventListener("input", function callback(e) {
  getBill(e);
});

totalPerson.addEventListener("input", function callback(e) {
  getPeople(e);
});

totalBill.addEventListener("blur", function (e) {
  if (e.target.value == "") {
    let message = "Can´t be zero";
    notification.forEach((item) => {
      item.dataset.type == "bill" ? addNotification(item, message) : null;
    });
  }
});

customTip.addEventListener("input", function callback(e) {
  if (e.target.value > 0 && !isNaN(e.target.value)) {
    getCustomTip(e);
  }
});

totalPerson.addEventListener("blur", function (e) {
  if (e.target.value == "") {
    let message = "Can´t be zero";
    notification.forEach((item) => {
      item.dataset.type == "person" ? addNotification(item, message) : null;
    });
  }
});

function getCustomTip(e) {
  btnTip.forEach((item) => item.classList.remove("clicked"));
  percent = 0;
  percent = e.target.value;
  if (percent && people > 0 && !isNaN(people) && bill > 0 && !isNaN(bill)) {
    showResult();
  }
}

function getBill(e) {
  totalBill.classList.remove("active");
  notification.forEach((item) => {
    item.dataset.type == "bill" ? item.classList.remove("notification") : null;
  });

  bill = e.target.value;
  if (bill < 0 || isNaN(bill)) {
    totalBill.classList.add("active");
  }

  if (isNaN(bill)) {
    let message = "Invalid Value";
    notification.forEach((item) => {
      item.dataset.type == "bill" ? addNotification(item, message) : null;
    });
  }
  if (percent && people > 0 && !isNaN(people) && bill > 0 && !isNaN(bill)) {
    showResult();
  }
}

function getPeople(e) {
  totalPerson.classList.remove("active");
  notification.forEach((item) => {
    item.dataset.type == "person" ? item.classList.remove("notification")
      : null;
  });
  people = e.target.value;
  if (people < 0 || isNaN(people)) {
    totalPerson.classList.add("active");
    console.log(isNaN(people));
  }

  if (isNaN(people)) {
    let message = "Invalid Value";
    console.log(message);
    notification.forEach((item) => {
      item.dataset.type == "person" ? addNotification(item, message) : null;
    });
  }
  if (percent && people > 0 && !isNaN(people) && bill > 0 && !isNaN(bill)) {
    showResult();
  }
}

function showResult() {
  const total = +bill * (+percent / 100);
  totalTip.innerHTML = `R$ ${total.toFixed(2)}`;

  const person = (+bill * (+percent / 100)) / people;
  personTip.innerHTML = `R$ ${person.toFixed(2)}`;
}
