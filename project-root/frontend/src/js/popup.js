function showPopup(cityData) {
    const popup = document.getElementById('popup');
    const title = document.getElementById('popup-title');
    title.textContent = `${cityData.name}`;
    popup.style.display = 'block';

    // Update travel times
    document.getElementById('plane-time').textContent = formatTime(cityData.flightTime);
    document.getElementById('train-time').textContent = formatTime(cityData.trainTime);
    document.getElementById('bus-time').textContent = formatTime(cityData.busTime);

    // Calculate maximum emission
    let maximumEmission = Math.max(cityData.flightEmission, cityData.trainEmission, cityData.busEmission);

    let flightEmissionPercentage = (cityData.flightEmission / maximumEmission) * 100;
    let trainEmissionPercentage = (cityData.trainEmission / maximumEmission) * 100;
    let busEmissionPercentage = (cityData.busEmission / maximumEmission) * 100;

    // Round emissions to nearest whole number
    let roundedFlightEmission = Math.round(cityData.flightEmission);
    let roundedTrainEmission = Math.round(cityData.trainEmission);
    let roundedBusEmission = Math.round(cityData.busEmission);

    let startProgress = 25;

    // Start progress bars with emission values
    animateProgressBar('.plane-progress', startProgress, flightEmissionPercentage, roundedFlightEmission + ' kg');
    animateProgressBar('.train-progress', startProgress, trainEmissionPercentage, roundedTrainEmission + ' kg');
    animateProgressBar('.bus-progress', startProgress, busEmissionPercentage, roundedBusEmission + ' kg');
}

function formatTime(timeStr) {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return `${hours}h ${minutes}m`;
}

function animateProgressBar(selector, initialWidth, finalWidth, emissionValue) {
    var elem = document.querySelector(selector);
    var width = initialWidth;

    // Check if finalWidth is greater than or equal to initialWidth
    if (finalWidth > initialWidth) {
        var main = setInterval(frame, 50);
        function frame() {
            if (width >= finalWidth) {
                width = finalWidth; // Ensure width doesn't exceed finalWidth
                clearInterval(main);
                elem.innerHTML = emissionValue; // Set emission value when done
            } else {
                width++;
                elem.style.width = width + "%";
                elem.innerHTML = emissionValue; // Set emission value continuously
            }
        }
    } else {
        // If finalWidth is equal to initialWidth, set it directly
        elem.style.width = width + "%";
        elem.innerHTML = emissionValue;
    }
}


function closePopup() {
    document.querySelector(".plane-progress").style.width = "0%";
    document.querySelector(".train-progress").style.width = "0%";
    document.querySelector(".bus-progress").style.width = "0%";
    
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}