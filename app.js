const searchText = document.getElementById('search-field');
const resultContainer = document.getElementById('result-container');
const phoneDetails = document.getElementById('phone-details');
const mainField = document.getElementById('main-filed');


document.getElementById('button-addon2').addEventListener('click', function () {
  document.getElementById('pre-loader').style.display = 'block';
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText.value}`)
    .then(res => res.json())
    .then(data => displayResult(data))
});

const displayResult = phones => {
  if (searchText.value === '') {
    mainField.style.display = 'none';
    document.getElementById('empty-error').style.display = 'block';
    document.getElementById('result-error').style.display = 'none';
    document.getElementById('result-header').style.display = 'none';
  } else if (phones.data.length === 0) {
    searchText.value = '';
    mainField.style.display = 'none';
    document.getElementById('result-error').style.display = 'block';
    document.getElementById('empty-error').style.display = 'none';
    document.getElementById('result-header').style.display = 'none';
  } else {
    mainField.style.display = 'block';
    searchText.value = '';
    resultContainer.textContent = '';
    phoneDetails.textContent = '';
    document.getElementById('result-error').style.display = 'none';
    document.getElementById('empty-error').style.display = 'none';
    document.getElementById('result-header').style.display = 'block';
    for(let i = 0; i < phones.data.slice(0,20).length ; i++) {
      const result = document.createElement('div');
      result.classList.add('col');
      result.innerHTML = `
              <div class="card h-100">
                <img src="${phones.data[i]?.image}" class="card-img-top w-50 m-auto mt-2" alt="image didn't find" />
                <div class="card-body">
                  <h5 class="card-title">${phones.data[i]?.phone_name}</h5>
                  <h6 class="card-title">${phones.data[i]?.brand}</h6>
                </div>
                <button onclick="details('${phones.data[i]?.slug}')" class="rounded-pill m-2">Show Details</button>
              </div>
      `;
      resultContainer.appendChild(result);
    }
  }
  document.getElementById('pre-loader').style.display = 'none';
};

const details = id => {
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data => showDetails(data))
};

const showDetails = clickedPhone => {
  location = '#phone-details';
  let sensors = '';
  if (clickedPhone.data?.mainFeatures?.sensors != undefined) {
    let sensorBoard = clickedPhone.data?.mainFeatures?.sensors;
    for (const sens of sensorBoard) {
      sensors = sensors + ' ' + sens + ',';
    }
  } else {
    sensors = "Sensors data isn't given or found"
  }

  phoneDetails.innerHTML = ``;
  const detailCard = document.createElement('div');
  detailCard.classList.add('card')
  detailCard.innerHTML = `
   <div class="row p-5">
   <div class="col-md-5"> <img src="${clickedPhone.data.image}" class="card-img-top w-75" alt="image not found">
   <div class="card-body">
    <h5 class="card-title">${clickedPhone.data.name}(${clickedPhone.data.brand})</h5>
    <p class="card-text"><b>Sensor Board:</b> ${sensors}</p>
    <p class="card-text"><small class="text-muted">${clickedPhone.data.releaseDate}</small></p>
  </div>
  </div>
   <div class="col-md-7 m-auto"> 
   <ul>
   <li><b>Memory:</b> ${clickedPhone.data?.mainFeatures?.memory}</li>
   <li><b>Display:</b> ${clickedPhone.data?.mainFeatures?.displaySize}</li>
   <li><b>Chipset:</b> ${clickedPhone.data?.mainFeatures?.chipSet}</li>
   <h3><strong>Others:</strong></h3>
   <li><b>Bluetooth:</b> ${clickedPhone.data?.others?.Bluetooth}</li>
   <li><b>GPS:</b> ${clickedPhone.data?.others?.GPS}</li>
   <li><b>WLAN:</b> ${clickedPhone.data?.others?.WLAN}</li>
   <li><b>USB:</b> ${clickedPhone.data?.others?.USB}</li>
   <li><b>NFC:</b> ${clickedPhone.data?.others?.NFC}</li>
   <li><b>Radio:</b> ${clickedPhone.data?.others?.Radio}</li>
 </ul>
 </div>
  </div>
  `
  phoneDetails.appendChild(detailCard)
};
