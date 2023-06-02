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
    
    selectRef.innerHTML = markup;

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
    selectRef.value = null;
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
    <img src="${img.url}" alt="Cat breed ${img.alt}" width="300px">
    <h2>${breedInfo.name}</h2>
    <p>${breedInfo.description}</p>
    `

    cardRef.innerHTML = markup;
}

