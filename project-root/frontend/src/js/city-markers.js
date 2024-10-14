
let citiesData = [];

function loadCities() {
    d3.json("../data/location-data.json").then(function(cities) {
        citiesData = cities;
        console.log("Cities loaded:", cities);
        
        drawCitiesWithLabels(cities); // Groepeert steden en labels samen
    }).catch(function(error) {
        console.error("Error loading the cities JSON file:", error);
    });
}

function drawCitiesWithLabels(cities) {
    const cityGroups = svg.selectAll(".city-group")
        .data(cities)
        .enter().append("g")  // Voeg een 'g' element toe voor elke stad
        .attr("class", "city-group")
        .attr("transform", d => {
            const coords = projection([d.lng, d.lat]);
            return `translate(${coords[0]}, ${coords[1]})`;
        })
        .on("click", function(event, d) {
            showPopup(d);
        });

    // Voeg de cirkel voor de stad toe
    cityGroups.append("circle")
        .attr("class", "city")
        .attr("r", 10);  // Stel de straal van de cirkel in

    // Voeg het label toe voor steden waar 'primary' is 'y'
    cityGroups.filter(d => d.primary === 'y')
        .append("text")
        .attr("class", "city-label")
        .attr("x", 17) // Zet de positie van de label naast de stad
        .attr("y", 6)  // Zet de positie van de label iets lager
        .text(d => d.name);
}

loadCities();