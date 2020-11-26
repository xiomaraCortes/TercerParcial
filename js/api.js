"use strict";

/*se crea la constante(restAPI) para la api, la cual esta el archivo es json 
    se saca de la pagina https://restcountries.eu/
*/

const restAPI = "https://restcountries.eu/rest/v2/all";
console.log(restAPI)

// se crean las variables las cuales estan especificadas en el index 
const countriesEl = document.getElementById("countries");
const toggleBtn = document.getElementById("toggle");
const filterBtn = document.getElementById("filter");
const regionFilter = filterBtn.querySelectorAll("li");
const searchEl = document.getElementById("search");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");

//Funcion para consumir json 
console.time("get countries ")
 getCountries();

 async function getCountries() {
     const res = await fetch(restAPI);
     const countries = await res.json();

     displayCountries(countries);
     //* Trying localStorage ****************

     localStorage.setItem("countriesObject", JSON.stringify(countries));

     let cObj = JSON.parse(localStorage.getItem("countriesObject"));

     //  let bigObject = JSON.parse(cObj);q

     //  console.log(bigObject)

     //  console.log(cObj);

     cObj.forEach(country => {
          console.log(country);
     });

 };

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

//Buscador de paises por nombre

searchEl.addEventListener("input", (e) => {
    const val = e.target.value;
    let names = document.querySelectorAll(".name");
    names.forEach(name => {
        if (name.innerText.toLowerCase().includes(val.toLowerCase())) {
            name.parentElement.parentElement.style.display = "block"
        } else {
            name.parentElement.parentElement.style.display = "none"
        }

    });
});


//Filtro de droplist
regionFilter.forEach(filter => {
    const value = filter.innerText;
    filter.addEventListener("click", () => {
        const regions = document.querySelectorAll(".region");
        regions.forEach(region => {

            if (region.innerText.includes(value) || value === "All") {
                region.parentElement.parentElement.style.display = "block"
            } else {
                region.parentElement.parentElement.style.display = "none"
            }
        });
    });
});

var countryBorders = [];

function fillModal(country, countries) {
    let num = 250;
    modal.querySelector("img").setAttribute("src", country.flag);
    modal.querySelector(".country-name").innerHTML = country.name;
    //  modal.querySelector(".name").setAttribute("dataCioc", country.cioc);
    modal.querySelector(".native-name").innerHTML = `<strong>Native Name: </strong><span>${country.nativeName}</span>`;
    modal.querySelector(".population").innerHTML = `<strong>Population: </strong><span>${country.population.toLocaleString()}</span>`;
    modal.querySelector(".region").innerHTML = `<strong>Region: </strong><span>${country.region}</span>`;
    modal.querySelector(".sub-region").innerHTML = `<strong>Sub Region: </strong><span>${country.subregion}</span>`;
    modal.querySelector(".capital").innerHTML = `<strong>Capital: </strong><span>${country.capital}</span>`;
    modal.querySelector(".domain").innerHTML = `<strong>Top Level Domain: </strong><span style="font-weight: 600;"><blue>${country.topLevelDomain[0]}</blue></span>`;
    if (country.currencies.length == "1") {
        modal.querySelector(".currency").innerHTML = `<strong>Currencies: </strong> <span> Name: <blue style="">${country.currencies[0].name}</blue></span> Code: <blue style="">${country.currencies[0].code}</blue><span> Simbol: <blue style="">${country.currencies[0].symbol}</blue></span>`;
    } else {
        modal.querySelector(".currency").innerHTML = `<strong>Currencies: </strong><span>${country.currencies.map(currency => currency.name).join(", ")}</span>`;
    }
    if (country.languages.length == "1") {
        modal.querySelector(".language").innerHTML = `<strong>Languages: </strong><span>${country.languages[0].name}</span>`;
    } else {
        modal.querySelector(".language").innerHTML = `<strong>Languages: </strong><span>${country.languages.map(language => language.name).join(", ")}</span>`;
    }

    if (country.borders.length == "1") {
        modal.querySelector(".border").innerHTML = `<strong>Borders: </strong><p id="cioc" style="display: inline-block;"></p>`;
        getBorder(country);
    } else if (country.borders.length == "0") {
        modal.querySelector(".border").innerHTML = `<strong>Borders: </strong><span>None</span>`;
    } else {
        modal.querySelector(".border").innerHTML = `<strong>Borders: </strong><p id="cioc" style="display: inline-block;"></p>`;
        getBorder(country);
    }

    function getBorder(country) {
        country.borders.forEach(border => {
            countries.forEach(coun => {
                if (coun.alpha3Code == border) {
                    let cioc = document.getElementById("cioc");
                    cioc.innerHTML += `<span>${coun.name}</span>`;
                }
            })
        })
    };
};

let bbb = JSON.parse(localStorage.getItem("countriesObject"));

window.addEventListener("unload", function(e) {
    localStorage.removeItem("countriesObject");
});