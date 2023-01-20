const container = window.document.querySelector(".movements");
const button_add = window.document.querySelector(".form__btn--add");
const button_delete = window.document.querySelector(".form__btn--delete");
const button_add_name = window.document.querySelector(".name__add");
const button_add_adress = window.document.querySelector(".adress__add");
const button_add_gpssirina = window.document.querySelector(".gpssirina__add");
const button_add_gpsduzina = window.document.querySelector(".gpsduzina__add");
const cancel_button = window.document.querySelector(".cancel-modal-btn");
const confirm_button = window.document.querySelector(".confirm-modal-btn");
const exit_button = window.document.querySelector(".exit-modal-btn-2");
const modal = window.document.querySelector(".modal");
const overlay = window.document.querySelector(".overlay");
const pop_red = document.querySelector(".alert-red");
const pop_yellow = document.querySelector(".alert-yellow");
const pop_green = document.querySelector(".alert-green");
const exit_red = document.querySelector(".exit-red");
const exit_yellow = document.querySelector(".exit-yellow");
const exit_green = document.querySelector(".exit-green");
const modal_edit = document.querySelector(".modal-edit");
const overlay_edit = document.querySelector(".overlay-edit");
const exit_modal_edit = document.querySelector(".exit-modal-edit");
const confirm_modal_edit = document.querySelector(".confirm-modal-edit");
const cancel_modal_edit = document.querySelector(".cancel-modal-edit");

let button_add_position = 0;
let load_position = 0;
let element = document.createElement("warning");
let novi = {
  id: "",
  ducan_id: 192,
  naziv: "",
  adresa: "",
  gpssirina: "",
  gpsduzina: "",
  timestamp: 3893227,
  thumb_id: 192001,
};

// * DELETE FUNKCIONALNOST - Na početku stavim da callback ne postoji
let confirmButtonCallback = null;
let confirmButtonCallbackEdit = null;
// * DELETE FUNKCIONALNOST - Na confirm gumb samo jednom vežem logiku i kažem ako postoji callback da ga pozove

//funckija za request
async function customHttp(url = "", method = "GET", data = null) {
  const response = await fetch(url, {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: data ? JSON.stringify(data) : undefined,
  });

  return response.json();
}
//funkcija za pretvaranje stringa u mala slova i prvo veliko
function capitalizeOnlyFirstLetter(words) {
  let arrayOfWords = words.split(" ");
  let CorrectArr = arrayOfWords.map((word) => {
    let capitalizedWord = word.toLowerCase().slice(1);
    helper = word[0].toUpperCase().slice(-1);
    capitalizedWord = helper + capitalizedWord;
    return capitalizedWord;
  });
  return CorrectArr.join(" ");
}

//funckija za generiranje random broja
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//poziv kad se stisne potvrdi button u modulu

confirm_button.addEventListener("click", () => {
  if (confirmButtonCallback) confirmButtonCallback();
});

//poziv kad se u modulu pritisne cancel button
cancel_button.addEventListener("click", () => {
  confirmButtonCallback = null;
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});
exit_button.addEventListener("click", () => {
  confirmButtonCallback = null;
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  console.log("lsdas");
});
//poziv kad se u edit modulu stisne cancel button
cancel_modal_edit.addEventListener("click", function () {
  confirmButtonCallbackEdit = null;
  button_add_adress.value = "";
  button_add_name.value = "";
  button_add_gpssirina.value = "";
  button_add_gpsduzina.value = "";
  modal_edit.classList.add("hidden");
  overlay_edit.classList.add("hidden");
  button_add_position = 0;
});
//poziv kad se u edit modulu stisne exit button
exit_modal_edit.addEventListener("click", function () {
  confirmButtonCallbackEdit = null;
  button_add_adress.value = "";
  button_add_name.value = "";
  button_add_gpssirina.value = "";
  button_add_gpsduzina.value = "";
  modal_edit.classList.add("hidden");
  overlay_edit.classList.add("hidden");
  button_add_position = 0;
});

//poziv za exit button na error ispisu
exit_red.addEventListener("click", function () {
  pop_red.classList.add("hidden");
});
//poziv za exit button na warning ispisu
exit_yellow.addEventListener("click", function () {
  pop_yellow.classList.add("hidden");
});
//poziv za exit button na succes ispisu
exit_green.addEventListener("click", function () {
  pop_green.classList.add("hidden");
});
//pomocna funckija koja provjerava i overridea warninge live
const check_hidden = function (element) {
  if (
    !pop_green.classList.contains("hidden") ||
    !pop_red.classList.contains("hidden") ||
    !pop_yellow.classList.contains("hidden")
  ) {
    pop_green.classList.add("hidden");
    pop_red.classList.add("hidden");
    pop_yellow.classList.add("hidden");
  }
};

//funkcija koja se zove na load-u i ucitava sve podatke u kontejner
const loadEvent = function () {
  const data = customHttp("http://localhost:3000/items", "GET");
  try {
    data.then(
      (value) => {
        container.innerHTML = "";
        value.forEach((element) => {
          let html = `<div class="movements__row" id="${element.id}">
      <div class="buttons__edit__delete movements__icons">
            <i class="far fa-trash-alt" style="font-size: 24px"></i>
            <i class="far fa-edit" style="font-size: 24px"></i>
          </div>
          <!--
      <div class="movements__type movements__type--deposit">ID:${element.id}</div>
      -->
      <div class="movements__date">Ime:<br>${element.naziv}</div>
      <div class="movements__date">Adresa:<br> ${element.adresa}</div>
      <div class="movements__date">
       Koordinate:(${element.gpsduzina},
        ${element.gpssirina})
      </div>
      <!--<div class="movements__value"></div>-->
      <div class="movements__date">
      <button type="button" class="artikli">Artikli</button>
      </div>

    </div>`;
          container.insertAdjacentHTML("afterbegin", html);
        });
      },
      (e) => {
        element.innerHTML = "Dogodio se problem prilikom loada";
        check_hidden(element);
        pop_red.classList.remove("hidden");
        pop_red.appendChild(element);
      }
    );
  } catch (e) {
    element.innerHTML = "Dogodio se problem prilikom loada";
    check_hidden(element);
    pop_red.classList.remove("hidden");
    pop_red.appendChild(element);
  }
};
loadEvent();

//funckija dodavanja ducana

button_add.addEventListener("click", function () {
  if (button_add_position === 0) {
    try {
      let name = button_add_name.value;
      let adress = button_add_adress.value;
      const gpssirina = button_add_gpssirina.value;
      const gpsduzina = button_add_gpsduzina.value;
      if (!name || !adress || !gpssirina || !gpsduzina) {
        element.innerHTML = "Niste unijeli sve podatke";
        check_hidden(element);
        pop_yellow.classList.remove("hidden");
        pop_yellow.appendChild(element);
        return;
      }
      novi.id = getRndInteger(90000000, 100000000);
      name = capitalizeOnlyFirstLetter(name);
      novi.naziv = name;
      novi.adresa = adress;
      novi.gpsduzina = gpsduzina;
      novi.gpssirina = gpssirina;
      customHttp("http://localhost:3000/items", "POST", novi);
      let html = `<div class="movements__row" id="${novi.id}">
  <div class="buttons__edit__delete movements__icons">
            <i class="far fa-trash-alt" style="font-size: 24px"></i>
            <i class="far fa-edit" style="font-size: 24px"></i>
          </div>
          <!--
  <div class="movements__type movements__type--deposit">ID:${novi.id}</div>
  -->
  <div class="movements__date">Ime:<br>${novi.naziv}</div>
  <div class="movements__date">Adresa:<br>${novi.adresa}</div>
  <div class="movements__date">
   Koordinate:(${novi.gpsduzina},${novi.gpssirina})
  </div>
  <!--<div class="movements__value"></div>-->
  <div class="movements__date">
      <button type="button" class="artikli">Artikli</button>
    </div>
</div>`;
      container.insertAdjacentHTML("afterbegin", html);
      element.innerHTML = "Dućan uspješno dodan";
      check_hidden(element);
      pop_green.classList.remove("hidden");
      pop_green.appendChild(element);
      button_add_name.value = "";
      button_add_adress.value = "";
      button_add_gpsduzina.value = "";
      button_add_gpssirina.value = "";
    } catch (e) {
      element.innerHTML = "Dogodio se problem prilikom dodavanja dućana";
      check_hidden(element);
      pop_red.classList.remove("hidden");
      pop_red.appendChild(element);
    }
  }
});

//Kada stistnem na container sluzi za povezivanje ikonica za brisanje i edititranje i sad desnom stranom
window.document
  .querySelector(".movements")
  .addEventListener("click", function (e) {
    if (e.target.classList.value === "far fa-edit") {
      //prevodenje podataka i baratanje njima
      const parent = e.target.closest(".movements__row");
      const array = parent.innerText.split("\n");
      let value = parent.id;
      console.log(array);
      const name = array[1];
      const adress = array[3];
      const choords = array[4].split(":");
      console.log(choords);
      let [gpsduzina, gpssirina] = choords[1]
        .slice(1, choords[1].length - 1)
        .split(",");
      button_add_adress.value = adress;
      button_add_name.value = name;
      button_add_gpssirina.value = gpssirina;
      button_add_gpsduzina.value = gpsduzina;
      novi = {
        id: "",
        ducan_id: 192,
        naziv: "",
        adresa: "",
        gpssirina: "",
        gpsduzina: "",
        timestamp: 3893227,
        thumb_id: 192001,
      };
      button_add_position = 1;
      button_add.addEventListener("click", function () {
        if (button_add_position === 1) {
          if (
            !button_add_adress.value ||
            !button_add_name.value ||
            !button_add_gpssirina.value ||
            !button_add_gpsduzina.value
          ) {
            element.innerHTML = "Niste unijeli sve podatke";
            check_hidden(element);
            pop_yellow.classList.remove("hidden");
            pop_yellow.appendChild(element);
            return;
          }
          modal_edit.classList.remove("hidden");
          overlay_edit.classList.remove("hidden");
          novi.id = value;
          novi.naziv = button_add_name.value;
          novi.adresa = button_add_adress.value;
          novi.gpssirina = button_add_gpssirina.value;
          novi.gpsduzina = button_add_gpsduzina.value;
        }
      });
      confirm_modal_edit.addEventListener("click", function () {
        if (confirmButtonCallbackEdit) {
          element.innerHTML = "Dućan uspješno uređen";
          check_hidden(element);
          pop_green.classList.remove("hidden");
          pop_green.appendChild(element);
          confirmButtonCallbackEdit();
        }
      });

      confirmButtonCallbackEdit = () => {
        customHttp(`http://localhost:3000/items/${novi.id}`, "PUT", novi);
        loadEvent();
        modal_edit.classList.add("hidden");
        overlay_edit.classList.add("hidden");
        confirmButtonCallbackEdit = null;
        button_add_adress.value = "";
        button_add_name.value = "";
        button_add_gpssirina.value = "";
        button_add_gpsduzina.value = "";
        button_add_position = 0;
      };
      //kada stisnemo submit button
    }
    //dio kada stinesmo delete ikonicu
    if (e.target.classList.value === "far fa-trash-alt") {
      const parent = e.target.closest(".movements__row");
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");
      // * DELETE FUNKCIONALNOST - Ako je kliknuta ikonica za brisanje postavim logiku za callback i čekam da se potvrdi u modalu
      confirmButtonCallback = () => {
        customHttp(
          `http://localhost:3000/items/${Number(parent.id)}`,
          "DELETE"
        );
        loadEvent();
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
        element.innerHTML = "Dućan uspješno izbrisan";
        check_hidden(element);
        pop_green.classList.remove("hidden");
        pop_green.appendChild(element);
        console.log("IZBRISANO");
        // * DELETE FUNKCIONALNOST - Nakon potvrde resetiram callback funkciju tako da se može ponovno vezati kada se klikne ikonica za brisanje
        confirmButtonCallback = null;
      };
    }
    //kada se stisne gumb artikli
    if (e.target.classList.value === "artikli") {
      window.location = "http://localhost:3000/artikli.html";
    }
  });
