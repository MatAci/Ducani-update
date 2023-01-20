const exit_green = document.querySelector(".exit-green");
const pop_green = document.querySelector(".alert-green");
exit_green.addEventListener("click", function () {
  pop_green.classList.add("hidden");
});
let element = document.createElement("warning");
const loadEvent = function () {};
window.addEventListener("load", loadEvent());
