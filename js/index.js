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
    
    <ul class="list-group">
    <li class="list-group-item">Sensor Name:${data.mainFeatures?.sensors[0] ?? "No Sensor Found."} </li>
    <li class="list-group-item">Sensor Name:${data.mainFeatures?.sensors[1] ?? "No Sensor Found."}</li>
    <li class="list-group-item">Sensor Name:${data.mainFeatures?.sensors[2]?? "No Sensor Found."}</li>
    <li class="list-group-item">Sensor Name:${data.mainFeatures?.sensors[4]?? "No Sensor Found."}</li>
    <li class="list-group-item">Sensor Name:${data.mainFeatures?.sensors[5]?? "No Sensor Found."}</li>
    <li class="list-group-item">Sensor Name:${data.mainFeatures?.sensors[6]?? "No Sensor Found."}</li>
    </ul>
    <h5>Other Features</h5>
    <ul class="list-group">
  
    <li class="list-group-item"><span class="fs-2">GPS:</span>${data.others?.GPS ?? "Others Information not Found." }</li>
    <li class="list-group-item">NFC${data.others?.NFC ?? "Others Information not Found."}</li>
    <li class="list-group-item">Radio${data.others?.Radio ?? "Others Information not Found."}</li>
    <li class="list-group-item">USB${data.others?.USB ?? "Others Information not Found."}</li>
    <li class="list-group-item">WLAN${data.others?.WLAN ?? "Others Information not Found."}</li>
    </ul>
  </div>`
  ;
  

  phoneDetails.appendChild(div);
  toggleSpinner('none');

}