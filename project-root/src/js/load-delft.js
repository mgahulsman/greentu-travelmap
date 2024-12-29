function loadDelft() {
    const delftCoords = projection([4.3570677, 52.0115769]); // Projecteer geografische coördinaten naar pixels

    // Voeg een groep toe voor Delft
    // const delftGroup = svg.append("g")
    //     .attr("class", "city-group") // Zorg dat zoom werkt op deze groep
    //     .datum({ lng: 4.3570677, lat: 52.0115769 })
    //     .raise();
    
    const delftGroup = svg.append("g")
        .attr("class", "delft") // Zorg dat zoom werkt op deze groep
        .datum({ lng: 4.3570677, lat: 52.0115769 })
        .raise();
    
    // Voeg de SVG in als marker
    delftGroup.append("image")
        .attr("xlink:href", "./assets/pop-up-images/ewi2.svg") // Pad naar je SVG-bestand
        .attr("x", delftCoords[0]) // Linkerhoek van het icoon (gecentreerd)
        .attr("y", delftCoords[1] - 30) // Bovenhoek van het icoon (gecentreerd)
        .attr("width", 20) // Breedte van de SVG
        .attr("height", 30) // Hoogte van de SVG
}
