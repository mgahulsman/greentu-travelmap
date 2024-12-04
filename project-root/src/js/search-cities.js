function filterCities(searchText) {
    const searchLower = searchText.toLowerCase();
    const filteredCities = citiesData.filter(city => 
        city.name.toLowerCase().includes(searchLower)
    );

    svg.selectAll(".city").remove();
    // svg.selectAll(".city-label").remove();
    drawCities(filteredCities);
}

document.getElementById('search-input').addEventListener('input', function(event) {
    filterCities(event.target.value);
});