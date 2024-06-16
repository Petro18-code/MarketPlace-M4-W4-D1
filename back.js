let scatolaProdotti = document.getElementById("prodottiAggiunti");

function aggiungiProdotto() {
  // console.log('funziona')
  let getName = document.getElementById("name").value;
  let getDescription = document.getElementById("description").value;
  let getBrand = document.getElementById("brand").value;
  let getImageUrl = document.getElementById("imageUrl").value;
  let getPrice = document.getElementById("price").value;
  // console.log(getPrice)

  if (
    getName !== "" &&
    getDescription !== "" &&
    getBrand !== "" &&
    getImageUrl !== "" &&
    getPrice !== ""
  ) {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY5ZjY0OTg1M2E0ZDAwMTU0ODYyOWYiLCJpYXQiOjE3MTgyMjAzNjEsImV4cCI6MTcxOTQyOTk2MX0.VBJp_8ba0rb4BdeYPRQInTiK_dQZmXwzhnExyR5BPaU",
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: getName,
        description: getDescription,
        brand: getBrand,
        imageUrl: getImageUrl,
        price: getPrice,
      }),
    }).then((response) => {
      // console.log(response)
      if (response.status === 200) {
        renderModal('Complimenti', 'Prodotto caricato corretamente')
        scatolaProdotti.innerHTML = "";
        renderProdotti();
      } else {
        renderModal('Errore', 'Articolo gia in magazzino')
      }
    });
  } else {
    renderModal('Errore', 'Non hai compilato tutti i campi', ['ok','closeModal()'], null, 3000)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderProdotti();
});

function renderProdotti() {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY5ZjY0OTg1M2E0ZDAwMTU0ODYyOWYiLCJpYXQiOjE3MTgyMjAzNjEsImV4cCI6MTcxOTQyOTk2MX0.VBJp_8ba0rb4BdeYPRQInTiK_dQZmXwzhnExyR5BPaU",
      "content-type": "application/json",
    },
  }).then((response) => {
    response.json().then((data) => {
      // console.log(data)
      data.forEach((element) => {
        scatolaProdotti.innerHTML += `
          <div>
            ${element._id}
            ${element.name}
            <svg xmlns="http://www.w3.org/2000/svg" onclick="modifica('${element._id}')" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" onclick="cancella('${element._id}')" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>
          </div>
        `;
      });
    });
  });
}

function modifica(id) {
  console.log("Sto provando a modificare " + id);

  let overlay = document.getElementById("overlay");
  overlay.classList.remove("d-none");

  let editModal = document.getElementById("edit-modal");
  editModal.classList.add("d-block");
  fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY5ZjY0OTg1M2E0ZDAwMTU0ODYyOWYiLCJpYXQiOjE3MTgyMjAzNjEsImV4cCI6MTcxOTQyOTk2MX0.VBJp_8ba0rb4BdeYPRQInTiK_dQZmXwzhnExyR5BPaU",
      "content-type": "application/json",
    },
  }).then((response) => {
    response.json().then((data) => {
      console.log(data.name);
      document.getElementById("name_mod").value = data.name;
      document.getElementById("description_mod").value = data.description;
      document.getElementById("brand_mod").value = data.brand;
      document.getElementById("imageUrl_mod").value = data.imageUrl;
      document.getElementById("price_mod").value = data.price;
      document.getElementById("id_mod").value = data._id;
    });
  });
}

function modificaProdotto() {
  let name_mod = document.getElementById("name_mod").value;
  let description_mod = document.getElementById("description_mod").value;
  let brand_mod = document.getElementById("brand_mod").value;
  let imageUrl_mod = document.getElementById("imageUrl_mod").value;
  let price_mod = document.getElementById("price_mod").value;
  let id_mod = document.getElementById("id_mod").value;

  fetch("https://striveschool-api.herokuapp.com/api/product/" + id_mod, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY5ZjY0OTg1M2E0ZDAwMTU0ODYyOWYiLCJpYXQiOjE3MTgyMjAzNjEsImV4cCI6MTcxOTQyOTk2MX0.VBJp_8ba0rb4BdeYPRQInTiK_dQZmXwzhnExyR5BPaU",
      "content-type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      name: name_mod,
      description: description_mod,
      brand: brand_mod,
      imageUrl: imageUrl_mod,
      price: price_mod,
    }),
  }).then((response) => {
    // console.log(response)
    if (response.status === 200) {
      alert("Il prodotto e modificato");
      scatolaProdotti.innerHTML = "";
      renderProdotti();
      chiudiModal();
    } else {
      alert("Errore");
    }
  });
}

function cancella(id) {
  // console.log("Sto provando a rimuovere" + id)
  let modalFooter = document.getElementById("modal-footer");
  modalFooter.innerHTML = "";
  modalFooter.innerHTML += `<button type="button" class="btn btn-primary" onclick="confermaEliminazzione('${id}')">Save changes</button>`;
  let modal = document.getElementById("delete-modal");

  let overlay = document.getElementById("overlay");
  overlay.classList.remove("d-none");

  modal.classList.add("d-block");
}

function chiudiModal() {
  let modal = document.getElementById("delete-modal");
  modal.classList.remove("d-block");

  let editModal = document.getElementById("edit-modal");
  editModal.classList.remove("d-block");

  let overlay = document.getElementById("overlay");
  overlay.classList.add("d-none");
}

function confermaEliminazzione(id) {
  console.log("confermo eliminazzione " + id);

  fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY5ZjY0OTg1M2E0ZDAwMTU0ODYyOWYiLCJpYXQiOjE3MTgyMjAzNjEsImV4cCI6MTcxOTQyOTk2MX0.VBJp_8ba0rb4BdeYPRQInTiK_dQZmXwzhnExyR5BPaU",
      "content-type": "application/json",
    },
  }).then((response) => {
    // console.log(response)
    if (response.status === 200) {
      chiudiModal();
      scatolaProdotti.innerHTML = "";
      renderProdotti();
    } else {
      alert("Errore, riprova tra un minuto ");
    }
  });
}

function renderModal(title, message, ok, cancel, temp) {

  // <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  let modalDiv = document.getElementById('modalId')
  modalDiv.classList.add('d-block')

  document.getElementById('modalTitle').innerHTML = title
  document.getElementById('modalBody').innerHTML = message

  if(ok !== null) {
    document.getElementById('modalFooter').innerHTML = "<button type='button' class='btn btn-primary' onclick='"+ ok[1] +"'>"+ ok[0] +"</button>"

  }

  if(temp !== null) {
    setTimeout(() => {
      closeModal()
    }, temp)  
  }

}

function closeModal() {
  let modalDiv = document.getElementById('modalId')
  modalDiv.classList.remove('d-block')
}