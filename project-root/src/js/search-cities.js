// const searchInput = document.getElementById('search-input');
// const dropdown = document.getElementById('dropdown');

// searchInput.addEventListener('input', function(event) {
//   const searchText = event.target.value.toLowerCase();

//   // Gebruik de citiesData die al in city-markers.js is geladen
//   const filteredCities = citiesData.filter(city => 
//     city.name.toLowerCase().includes(searchText)
//   );

//   // Maak de dropdown leeg
//   dropdown.innerHTML = '';

//   // Voeg de gefilterde steden toe aan de dropdown
//   filteredCities.forEach(city => {
//     const option = document.createElement('div');
//     option.textContent = city.name;
//     option.classList.add('dropdown-item');

//     option.addEventListener('click', () => {
//       searchInput.value = city.name;
//       dropdown.innerHTML = '';
//       // Voer hier eventueel verdere acties uit, zoals het zoomen naar de stad
//     });

//     dropdown.appendChild(option);
//   });

//   // Toon of verberg de dropdown
//   dropdown.style.display = filteredCities.length > 0 ? 'block' : 'none';
// });

const steden = [
  "Amsterdam", "Rotterdam", "Den Haag", "Utrecht", "Eindhoven", "Groningen", "Tilburg", "Almere", "Breda", "Nijmegen"
];

const searchInput = document.getElementById('search-input');
const dropdown = document.getElementById('dropdown');
const dropdownList = dropdown.querySelector('ul');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredSteden = steden.filter(stad => stad.toLowerCase().includes(searchTerm));

  dropdownList.innerHTML = ''; 

  filteredSteden.forEach(stad => {
    const listItem = document.createElement('li');
    listItem.textContent = stad;
    listItem.classList.add('dropdown-item'); 
    dropdownList.appendChild(listItem);
  });

  dropdown.style.display = filteredSteden.length > 0 ? 'block' : 'none'; 
});