const searchText = document.getElementById('search-field');
const resultContainer = document.getElementById('result-container');


document.getElementById('button-addon2').addEventListener('click', function () {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText.value}`)
    .then(res => res.json())
    .then(data => displayResult(data))
})

const displayResult = phones => {

  if (searchText.value == '') {
    alert('dddd')
  }else if (phones.data.length == 0) {
    alert('ssss')
  }else {
    searchText.value = '';
    resultContainer.textContent = '';
    for (let i = 0; i < 20; i++) {
      console.log(phones.data[i]);
      const result = document.createElement('div');
      result.classList.add('col');
      result.innerHTML = `
              <div class="card h-100">
                <img src="${phones.data[i]?.image}" class="card-img-top w-75 m-auto mt-2" alt="image didn't find" />
                <div class="card-body">
                  <h5 class="card-title">${phones.data[i]?.phone_name}</h5>
                  <h6 class="card-title">${phones.data[i]?.brand}</h6>
                </div>
              </div>
      `
      resultContainer.appendChild(result);
    }
  }
}