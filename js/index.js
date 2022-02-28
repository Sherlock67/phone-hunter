
const searchPhone = () =>{
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayResult(data.data))

}

const displayResult = (data) =>{
  const searchResult = document.getElementById('search-result');
  console.log(searchResult);
  data.forEach(phone => {
    console.log(phone);
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div  class="card h-100">
          <img src="${phone.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text"></p>
          </div>
        </div>
    
    `;
    searchResult.appendChild(div);
  })
  
}