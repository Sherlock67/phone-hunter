
const searchPhone = () =>{
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayResult(data.data))
   

}

const displayResult = (data) =>{
  const nothingFound = document.getElementById('nothing-found');
  const searchResult = document.getElementById('search-result');
  if(status == false){
    const paragraph = document.createElement('p');
    paragraph.classList.add('d-block')
    paragraph.innerHTML=`<h5>Aagfagfa</h5>`
    nothingFound.appendChild(paragraph)
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
}

const loadPhoneDetails = phoneId =>{

  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
  fetch(url)
  .then(res=>res.json())
  .then(data =>showPhoneDetails(data.data))
}
const showPhoneDetails = data => {
  const phoneDetails = document.getElementById('phone-details')
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML =`
  <img src="${data.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.releaseDate}</h5>
    <h5>Main Features</h5>
    <ul class="list-group">
    <li class="list-group-item">${data.mainFeatures.storage}</li>
    <li class="list-group-item">${data.mainFeatures.displaySize}</li>
    <li class="list-group-item">${data.mainFeatures.chipSet}</li>
    <li class="list-group-item">${data.mainFeatures.memory}</li>
    </ul>
  </div>`
  ;
  phoneDetails.appendChild(div);

}