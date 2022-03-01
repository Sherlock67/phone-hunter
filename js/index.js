
const searchPhone = () =>{
    const searchField = document.getElementById('search-field')
    const blankSearch = document.getElementById('blank-search');
    const searchText = searchField.value;
    searchField.value = '';
    blankSearch.textContent = '';
    if(searchText == ''){
      const paragraph = document.createElement('p');
      paragraph.classList.add('text-danger');
      paragraph.innerHTML = `Please enter a String value`;
      blankSearch.appendChild(paragraph);
      
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
  searchResult.textContent = '';
  nothingFound.textContent = '';
   if(status === false){
     var paragraph = document.createElement('p');
     paragraph.innerHTML=`No Phone Found`;
     nothingFound.appendChild(paragraph);
    
   } 
  data.forEach(phone => {
    console.log(phone);
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
}
const loadPhoneDetails = phoneId =>{

  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
  fetch(url)
  .then(res=>res.json())
  .then(data =>showPhoneDetails(data.data))
}
const showPhoneDetails = data => {
  const phoneDetails = document.getElementById('phone-details')
  phoneDetails.textContent = '';
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML =`
  <img src="${data.image}" class="card-img-top img-fluid" alt="...">
  <div class="card-body >
    <h5 class="card-title">${data.releaseDate}</h5>
    <h5>Main Features</h5>
    <ul class="list-group">
    <li class="list-group-item">${data.mainFeatures.storage}</li>
    <li class="list-group-item">${data.mainFeatures.displaySize}</li>
    <li class="list-group-item">${data.mainFeatures.chipSet}</li>
    <li class="list-group-item">${data.mainFeatures.memory}</li>
    </ul>
    <h5>Sensor</h5>
    <ul class="list-group">
    <li class="list-group-item">${data.mainFeatures.sensors[0]}</li>
    <li class="list-group-item">${data.mainFeatures.sensors[1]}</li>
    <li class="list-group-item">${data.mainFeatures.sensors[2]}</li>
    <li class="list-group-item">${data.mainFeatures.sensors[4]}</li>
    <li class="list-group-item">${data.mainFeatures.sensors[5]}</li>
    <li class="list-group-item">${data.mainFeatures.sensors[6]}</li>
    </ul>
    <h5>Other Features</h5>
    <ul class="list-group">
    <li class="list-group-item">${data.mainFeatures.others.Bluetooth}</li>
    <li class="list-group-item">${data.mainFeatures.GPS}</li>
    <li class="list-group-item">${data.mainFeatures.NFC}</li>
    <li class="list-group-item">${data.mainFeatures.Radio}</li>
    <li class="list-group-item">${data.mainFeatures.USB}</li>
    <li class="list-group-item">${data.mainFeatures.WLAN}</li>
    </ul>
  </div>`
  ;
  

  phoneDetails.appendChild(div);

}