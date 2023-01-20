window.document
  .querySelector(".movements")
  .addEventListener("click", function (e) {
    if (e.target.classList.value === "artikli") {
      window.location = "http://localhost:3000/artikli.html";
    }
  });
