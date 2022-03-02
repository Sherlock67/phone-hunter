//needs dynamic sensor
//and others
//20 result

const toggleSpinner = (displayStyle) =>{
  document.getElementById('loader').style.display = displayStyle;
}
const searchPhone = () =>{
  toggleSpinner('block');
  const nothingFound = document.getElementById('nothing-found');
    const searchField = document.getElementById('search-field')
    const blankSearch = document.getElementById('blank-search');
    const searchText = searchField.value;
    searchField.value = '';
    blankSearch.textContent = '';
    
    if(searchText === ''){
      toggleSpinner('none');
      const paragraph = document.createElement('p');
      paragraph.classList.add('text-danger');
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
const displayResult = (result) =>{
  
  const {data, status} = result;
  const nothingFound = document.getElementById('nothing-found');
  const searchResult = document.getElementById('search-result');
  const blankSearch = document.getElementById('blank-search');
  searchResult.textContent = '';
  nothingFound.textContent = '';
   if(status === false){
     var paragraph = document.createElement('p');
     paragraph.innerHTML=`No Phone Found`;
     nothingFound.appendChild(paragraph);
     blankSearch.style.display = 'none';
     nothingFound.style.display = 'block';
   } 
 
  data.forEach(phone => {
    //console.log(phone);
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="shadow-lg card border-0 ">
          <img src="${phone.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.brand}</p>
            <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-info text-white rounded-pill">Explore More</button>
          </div>
        </div>
    `;
    searchResult.appendChild(div);
  })
  toggleSpinner('none');
}
const loadPhoneDetails = phoneId =>{
  toggleSpinner('block');
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
  fetch(url)
  .then(res=>res.json())
  .then(data =>showPhoneDetails(data.data))
}
const showPhoneDetails = data => {
  // const searchResult = document.getElementById('search-result');
  const phoneDetails = document.getElementById('phone-details')
  phoneDetails.textContent = '';
  
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML =`
  <img src="${data.image}" class="card-img-top" alt="...">
  <div class="card-body >
    <h5 class="card-title">${data.name}</h5>
    <h5 class="card-title">${data?.releaseDate ?? "No Release Date Found"}</h5>
    <h5>Main Features</h5>
    <ul class="list-group">
    <li class="list-group-item">Storage: ${data.mainFeatures.storage}</li>
    <li class="list-group-item">Display Size${data.mainFeatures.displaySize}</li>
    <li class="list-group-item">ChipSet${data.mainFeatures.chipSet}</li>
    <li class="list-group-item">Memory${data.mainFeatures.memory}</li>
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

const displaySensor = (sensors) => {
  const allSensors = document.getElementById('all-sensors');
  // console.log(allSensors);
  sensors.forEach( sensor=>{
    const list = document.createElement('li');
    // console.log(list);
    // console.log(sensor);
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
const OtherFeatures = (others) => {
  const otherFeatures = document.getElementById('others-feature');
   for(const other in others){
    const list = document.createElement('li');
    list.classList.add('list-group-item');
    if(!other){
      list.innerHTML = `No Sensor Found`;
    }
    else{
      list.innerHTML = `${other}`;
    }
    otherFeatures.appendChild(list);
   }

}