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
        .enter().append("g")
        .attr("class", "city-group")
        .attr("transform", d => {
            const coords = projection([d.lng, d.lat]);
            return `translate(${coords[0]}, ${coords[1]})`;
        })
        .on("click", function(event, d) {
            showPopup(d);
        })
        .raise();  // Brengt de markers naar voren;

    cityGroups.filter(d => d.primary !== 'd')  // Filter de data waar primary niet 'd' is
        .append("circle")
        .attr("class", "city"); 

    cityGroups.filter(d => d.primary === 'd') 
        .append("image")  // Voeg een image element toe
        .attr("xlink:href", "./assets/other/libary.svg")
        .attr("x", -10) 
        .attr("y", -33)
        .attr("width", 30);

    cityGroups.filter(d => d.primary === 'd')
        .append("text")
        .attr("class", "city-label")
        .attr("x", 25) 
        .attr("y", 5)  
        .text(d => d.name);


    cityGroups.filter(d => d.primary === 'y')
        .append("text")
        .attr("class", "city-label")
        .attr("x", 11) // Zet de positie van de label naast de stad
        .attr("y", 5)  // Zet de positie van de label iets lager
        .text(d => d.name);
}

function loadDelft() {
}