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

//Cambiar de color 
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark")
})

filterBtn.addEventListener("click", () => {
    filterBtn.classList.toggle("open");

})

