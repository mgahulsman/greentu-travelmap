function loadDelft() {
    const delftCoords = projection([4.3570677, 52.0115769]);

    const delft = svg.append("g")
        .attr("class", "delft")
        .datum({ lng: 4.3570677, lat: 52.0115769 })
        .raise();
    
    delft.append("image")
        .attr("xlink:href", "./assets/other/travelers.svg")
        .attr("x", delftCoords[0] - 140)
        .attr("y", delftCoords[1] - 65)
        .attr("width", 30)
        .attr("height", 30);
}