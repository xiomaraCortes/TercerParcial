"use strict";

/*se crea la constante(restAPI) para la api, la cual esta el archivo es json 
    se saca de la pagina https://restcountries.eu/
*/

const restAPI = "https://restcountries.eu/rest/v2/all";
// console.log(restAPI)

// se crean las variables las cuales estan especificadas en el index 
const countriesEl = document.getElementById("countries");
const toggleBtn = document.getElementById("toggle");
const filterBtn = document.getElementById("filter");
const regionFilter = filterBtn.querySelectorAll("li");
const searchEl = document.getElementById("search");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");

console.time("get countries ")
 getCountries();

 async function getCountries() {
     const res = await fetch(restAPI);
     const countries = await res.json();

     console.time("display countries")

     displayCountries(countries);
     console.log(countries.length + " countries");

     //* Trying localStorage ****************

     localStorage.setItem("countriesObject", JSON.stringify(countries));

     let cObj = JSON.parse(localStorage.getItem("countriesObject"));

     //  let bigObject = JSON.parse(cObj);

     //  console.log(bigObject)

     //  console.log(cObj);

     cObj.forEach(country => {
         //  console.log(country);
     });

     //* ***********************************

     console.timeEnd("display countries");
 };

 console.timeEnd("get countries ");

 function displayCountries(countries) {
     countriesEl.innerHTML = "";
     countries.forEach(country => {
         const countryEl = document.createElement("div");
         countryEl.className = "card";
         countryEl.innerHTML = `
                <div class="country-header">
                    <img src=${country.flag} alt=${country.name}>
                </div>
                <div class="card-body">
                    <h2 class="name" data-cioc="${country.cioc}">${country.name}</h2>
                    <p class="population"><strong>Population: </strong>${country.population.toLocaleString()}</p>
                    <p class="region"><strong>Region: </strong>${country.region}</p>
                    <p class="capital"><strong>Capital: </strong>${country.capital}</p>
                </div>
     `;
         countriesEl.appendChild(countryEl);
         countryEl.addEventListener("click", () => {

             if (window.innerWidth >= 900) {
                 modal.style.display = "grid";
             } else {
                 modal.style.display = "block";
             }

             fillModal(country, countries);
         });
     });

 };


//Cambiar de color 
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark")
})

//Abre droplist
filterBtn.addEventListener("click", () => {
    filterBtn.classList.toggle("open");

})

// Boton close en modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

