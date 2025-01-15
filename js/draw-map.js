const svg = d3.select("svg");
const width = window.innerWidth;
const height = window.innerHeight;

svg.attr("width", width);
svg.attr("height", height);

let scale;
if (width < 768) { // mobiel
  scale = 2.5 * width;
} else { // desktop
  scale = width;
}

const projection = d3.geoMercator()
    .center([10, 51])
    .scale(scale)
    .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

const zoom = d3.zoom()
    .scaleExtent([0.5, 8])
    .on("zoom", zoomed);

svg.call(zoom);

function zoomed(event) {
    // Pas alleen de paden (landgebieden) aan
    svg.selectAll("path").attr("transform", event.transform);

    svg.selectAll(".city-group")
        .attr("transform", d => {
            const coords = projection([d.lng, d.lat]);
            return `translate(${event.transform.applyX(coords[0])}, ${event.transform.applyY(coords[1])})`;
        });

    svg.selectAll(".delft")
        .attr("transform", event.transform);
}

// Load the TopoJSON file
d3.json("data/map.topojson").then(function(data) {
    drawMap(data); 
    loadDelft();
    loadCities();
}).catch(function(error) {
    console.error("Error loading the TopoJSON file:", error);
});

function drawMap(data) {
    const countries = topojson.feature(data, data.objects.collection);
  
    const fillColor = "var(--land-color)"; 

    svg.selectAll("path")
        .data(countries.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", fillColor)
        .attr("stroke", "var(--white-color)")
        .attr("stroke-width", 0.5)
        .attr("class", "land");
}

