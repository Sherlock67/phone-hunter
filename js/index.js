//needs dynamic sensor ->done
//and others - done
//20 result->done



// Spinner toggler
const toggleSpinner = (displayStyle) =>{
  document.getElementById('loader').style.display = displayStyle;
}
// data fetcher
const searchPhone = () =>{
  toggleSpinner('block');
  const nothingFound = document.getElementById('nothing-found');
    const searchField = document.getElementById('search-field')
    const blankSearch = document.getElementById('blank-search');
    const searchText = searchField.value;
    searchField.value = '';
    blankSearch.textContent = '';
    blankSearch.style.display = 'none'
    nothingFound.style.display = 'none'
    if(searchText === ''){
      toggleSpinner('none');
      const paragraph = document.createElement('p');
      paragraph.classList.add('fw-bold','text-danger','alert','alert-primary');
      paragraph.innerHTML = `Please enter a String value`;
      blankSearch.appendChild(paragraph);
      blankSearch.style.display = 'block'
      nothingFound.style.display = 'none';
    }else{
      const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
      fetch(url)
      .then(res=>res.json())
      .then(data=>displayResult(data))
    }
}
// all phones show
const displayResult = (result) =>{
  
  const {data, status} = result;
  const nothingFound = document.getElementById('nothing-found');
  const searchResult = document.getElementById('search-result');
  const blankSearch = document.getElementById('blank-search');
  searchResult.textContent = '';
  nothingFound.textContent = '';
   if(status === false){
     var paragraph = document.createElement('p');
     paragraph.classList.add('fw-bold','alert' ,'alert-primary','text-danger');
     paragraph.innerHTML=`No Phone Found`;
     nothingFound.appendChild(paragraph);
     blankSearch.style.display = 'none';
     nothingFound.style.display = 'block';
   } 
  let count = 0;
  for(const phone of data){

    count++;
    if(count > 20){
      break;
    }
      //console.log(phone);
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="shadow-lg card border-0 ">
          <img src="${phone.image}" class="card-img-top p-2" alt="...">
          <div class="card-body">
            <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>
            <p class="card-text ">Brand Name: ${phone.brand}</p>
            <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-info text-white rounded-pill">Explore More</button>
          </div>
        </div>
    `;
    searchResult.appendChild(div);
  }
  toggleSpinner('none');
}
const loadPhoneDetails = phoneId =>{
  toggleSpinner('block');
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
  fetch(url)
  .then(res=>res.json())
  .then(data =>showPhoneDetails(data.data))
}
//single phone details
const showPhoneDetails = data => {
  const phoneDetails = document.getElementById('phone-details')
  phoneDetails.textContent = '';
  const div = document.createElement('div');
  div.classList.add('card','border-0','rounded','align-items-center');
  div.innerHTML =`
  <img src="${data.image}" class="card-img-top p-3" style="width: 18rem;"alt="...">
  <div class="card-body >
    <h5 class="card-title">${data.name}</h5>
    <h5 class="card-title">${data.releaseDate ? data.releaseDate:"No Release Date Found."} </h5>
    <h5>Main Features</h5>
    <ul class="list-group">
      <li class="list-group-item">Storage: ${data.mainFeatures.storage}</li>
      <li class="list-group-item">Display Size:${data.mainFeatures.displaySize}</li>
      <li class="list-group-item">ChipSet:${data.mainFeatures.chipSet}</li>
      <li class="list-group-item">Memory:${data.mainFeatures.memory}</li>
    </ul>
    <h5>Sensor</h5>
    <ul id="all-sensors" class="list-group">
    </ul>
    <h5>Other Features</h5>
    <ul id="others-feature" class="list-group">
    </ul>
  </div>`
  ;
  phoneDetails.appendChild(div);
  displaySensor(data.mainFeatures.sensors);
  OtherFeatures(data.others);
  toggleSpinner('none');
}
//for showing sensors
const displaySensor = (sensors) => {
  const allSensors = document.getElementById('all-sensors');
  sensors.forEach( sensor=>{
    const list = document.createElement('li');
    list.classList.add('list-group-item');
    if(!sensor ){
      list.innerHTML = `No Sensor Found`;
    }
    else{
      list.innerHTML = `${sensor}`;
    }
    allSensors.appendChild(list);
  });
}
// for showing others features
const OtherFeatures = (others) => {
  const otherFeatures = document.getElementById('others-feature');
  console.log(otherFeatures);
  if(!others ){
    otherFeatures.innerHTML = `No Others Information Found`
  }
  else{
    for(const [key,data] of Object.entries(others)){
      console.log('hi there');
      const list = document.createElement('li');
      list.classList.add('list-group-item');
      list.innerText = `${key} : ${data}`;
      otherFeatures.appendChild(list);
     }
  }
  

}