function searchCities(cityData) {
  const cityNames = cityData
    .filter(city => city.primary !== 'd') // Filter Delft eruit
    .map(city => city.name);
  const searchInput = document.getElementById('search-input');
  const dropdown = document.getElementById('dropdown');
  const dropdownList = dropdown.querySelector('ul');

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filterCities = cityNames.filter(city => city.toLowerCase().includes(searchTerm));

    dropdownList.innerHTML = '';

    filterCities.forEach(city => {
      const listItem = document.createElement('li');
      listItem.textContent = city;
      listItem.classList.add('dropdown-item'); 

      listItem.addEventListener('click', () => {
        const selectedCityData = cityData.find(item => item.name === city); 
        showPopup(selectedCityData); 
      });

      dropdownList.appendChild(listItem);
    });

    dropdown.style.display = filterCities.length > 0 ? 'block' : 'none';

    function searchCities(cityData) {
      const cityNames = cityData.map(city => city.name);
      const searchInput = document.getElementById('search-input');
      const dropdown = document.getElementById('dropdown');
      const dropdownList = dropdown.querySelector('ul');
    
      searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filterCities = cityNames.filter(city => city.toLowerCase().includes(searchTerm));
    
        dropdownList.innerHTML = '';
    
        filterCities.forEach(city => {
          const listItem = document.createElement('li');
          listItem.textContent = city;
          listItem.classList.add('dropdown-item'); 
    
          listItem.addEventListener('click', () => {
            const selectedCityData = cityData.find(item => item.name === city); 
            showPopup(selectedCityData); 
          });
    
          dropdownList.appendChild(listItem);
        });
    
        dropdown.style.display = filterCities.length > 0 ? 'block' : 'none'; 
      });
    };
    
    // Ways to remove the dropdown
    document.addEventListener('click', (event) => {
      if (!dropdown.contains(event.target) && event.target !== searchInput) {
        dropdown.style.display = 'none';
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        dropdown.style.display = 'none';
      }
    });
  });
};

