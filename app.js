const searchText = document.getElementById('search-field');
const resultContainer = document.getElementById('result-container');
const phoneDetails = document.getElementById('phone-details');


document.getElementById('button-addon2').addEventListener('click', function () {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText.value}`)
    .then(res => res.json())
    .then(data => displayResult(data))
})

const displayResult = phones => {

  if (searchText.value === '') {
    alert('dddd')
  } else if (phones.data.length === 0) {
    alert('ssss')
  } else {
    searchText.value = '';
    resultContainer.textContent = '';
    for (let i = 0; i < 20; i++) {
      console.log(phones.data[i]);
      const result = document.createElement('div');
      result.classList.add('col');
      result.innerHTML = `
              <div onclick="details('${phones.data[i].slug}')" class="card h-100">
                <img src="${phones.data[i]?.image}" class="card-img-top w-50 m-auto mt-2" alt="image didn't find" />
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

const details = id => {
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data => showDetails(data))
}

const showDetails = clickedPhone => {
  let sensors = '';
  if (clickedPhone.data?.mainFeatures?.sensors != undefined) {
    let sensorBoard = clickedPhone.data?.mainFeatures?.sensors;
    for (const sens of sensorBoard) {
      sensors = sensors + ' ' + sens + ',';
    }
  } else {
    sensors = "Sensors data isn't given or found"
  }
  console.log(sensors);
  phoneDetails.innerHTML = ``;
  const detailCard = document.createElement('div');
  detailCard.classList.add('card')
  detailCard.innerHTML = `
   <div class="row p-5">
   <div class="col-md-5"> <img src="${clickedPhone.data.image}" class="card-img-top w-75" alt="image not found"></div>
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
  <div class="card-body">
    <h5 class="card-title">${clickedPhone.data.name}(${clickedPhone.data.brand})</h5>
    <p class="card-text"><b>Sensor Board:</b> ${sensors}</p>
    <p class="card-text"><small class="text-muted">${clickedPhone.data.releaseDate}</small></p>
  </div>
  `
  phoneDetails.appendChild(detailCard)
}