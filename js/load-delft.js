function loadDelft() {
    const delftCoords = projection([4.3570677, 52.0115769]);

    const delft = svg.append("g")
        .attr("class", "delft")
        .datum({ lng: 4.3570677, lat: 52.0115769 })
        .raise();
    
    delft.append("image")
        .attr("xlink:href", "./assets/other/aula.svg")
        .attr("x", delftCoords[0] - 140)
        .attr("y", delftCoords[1] - 65)
        .attr("width", 300)
        .attr("height", 70);
    
    delft.append("circle")
        .attr("cx", delftCoords[0]) 
        .attr("cy", delftCoords[1])
        .attr("class", "delft-marker")
        .attr("r", 8) 
    
    delft.append("text")
        .attr("class", "city-label")
        .attr("x", delftCoords[0] + 11) 
        .attr("y", delftCoords[1] + 5) 
        .text("Delft (departure location)"); 

    return delftCoords
}