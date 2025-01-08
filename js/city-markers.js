function loadCities() {
    d3.json("data/location-data.json").then(function(cityData) {
        drawCitiesWithLabels(cityData); // Groepeert steden en labels samen
        searchCities(cityData);
    }).catch(function(error) {
        console.error("Error loading the cities JSON file:", error);
    });
}

function drawCitiesWithLabels(cityData) {
    const cityGroups = svg.selectAll(".city-group")
        .data(cityData)
        .enter().append("g")  // Voeg een 'g' element toe voor elke stad
        .attr("class", "city-group")
        .attr("transform", d => {
            const coords = projection([d.lng, d.lat]);
            return `translate(${coords[0]}, ${coords[1]})`;
        })
        .on("click", function(event, d) {
            showPopup(d);
        })
        .raise();  // Brengt de markers naar voren;

    cityGroups.append("circle")
        .attr("class", "city")
        .attr("r", 8); 

    cityGroups.filter(d => d.primary === 'y')
        .append("text")
        .attr("class", "city-label")
        .attr("x", 11) // Zet de positie van de label naast de stad
        .attr("y", 5)  // Zet de positie van de label iets lager
        .text(d => d.name);
}
