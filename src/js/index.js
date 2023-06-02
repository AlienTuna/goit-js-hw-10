import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from "slim-select";

const selectRef = document.querySelector('select.breed-select');
// let selectSlimRef;
const errorPRef = document.querySelector('p.error');
const loaderPRef = document.querySelector('p.loader');
const cardRef = document.querySelector('div.cat-info');


// render breeds selector
fetchBreeds()
.then(renderBreedSelect)
.catch(showError)
.finally(hideLoader)

selectRef.addEventListener('input', onSelectorInput)

function renderBreedSelect(json) {
    const markup = json.map(el => `<option value='${el.id}'>${el.name}</option>`).join('')
    
    selectRef.insertAdjacentHTML('beforeend',markup);
    selectRef.value = null;

    // selectSlimRef = new SlimSelect({
    //     select: selectRef,
    //     data: [
    //         {label: 'Choose the breed'},
    //         {'placeholder': true, 'text': 'Choose the breed'},
    //         {options: xx},
    //     ],
    // })

    selectRef.classList.remove('hidden');
}

function hideLoader() {
    console.info('!!!then!!!');
    loaderPRef.classList.add('hidden');
    // selectRef.value = null;
}
function showError() {
    console.error('!!!catch!!!');
    errorPRef.classList.remove('hidden');
}
function showLoader() {
    loaderPRef.classList.remove('hidden');
    errorPRef.classList.add('hidden');
    cardRef.innerHTML = '';
}

function onSelectorInput(e) {
    showLoader();

    const chosenBreed = e.currentTarget.value;
    console.info(chosenBreed);

    fetchCatByBreed(chosenBreed)
    .then(renderCatCard)
    .catch(showError)
    .finally(hideLoader)
}
function renderCatCard(json) {
    console.log ('JSON IS',json)

    const breedInfo = json[0].breeds[0];
    const img = {
        url: json[0].url,
        alt: breedInfo.name,
    }
    
    console.log(breedInfo);

    const markup = 
    `
    <h2 class="header">${breedInfo.name}</h2>
    
    <div class="card">
    <img src="${img.url}" alt="Cat breed ${img.alt}" class="image">
    <div class="description">
    <p class="text">${breedInfo.description}</p>
    <p class="text"><b>Temperament:</b> ${breedInfo.temperament}</p>
    </div>
    </div>
    `

    cardRef.innerHTML = markup;
}

