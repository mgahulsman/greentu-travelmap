function showPopup(cityData) {
    const popup = document.getElementById('popup');
    const title = document.getElementById('popup-title');
    title.textContent = `${cityData.name}`;
    popup.style.display = 'block';

    // Place travel times
    document.getElementById('plane-time').textContent = formatTime(cityData.flightTime);
    document.getElementById('train-time').textContent = formatTime(cityData.trainTime);
    document.getElementById('bus-time').textContent = formatTime(cityData.busTime);

    // Place travel emmission
    document.getElementById('plane-emission').textContent = Math.round(cityData.flightEmission) + "kg";
    document.getElementById('train-emission').textContent = Math.round(cityData.trainEmission) + "kg";
    document.getElementById('bus-emission').textContent = Math.round(cityData.busEmission) + "kg";
    
    let maximumEmission = Math.max(cityData.flightEmission, cityData.trainEmission, cityData.busEmission);
    let flightEmissionPercentage = (cityData.flightEmission / maximumEmission) * 100;
    let trainEmissionPercentage = (cityData.trainEmission / maximumEmission) * 100;
    let busEmissionPercentage = (cityData.busEmission / maximumEmission) * 100;

    let startProgress = 15;

    // Start progress bars with emission values
    animateProgressBar('.plane-progress', startProgress, flightEmissionPercentage);
    animateProgressBar('.train-progress', startProgress, trainEmissionPercentage);
    animateProgressBar('.bus-progress', startProgress, busEmissionPercentage);
}

function formatTime(timeStr) {
    const [days, hours, minutes] = timeStr.split(":").map(Number);
    if (days === 0) {
      if (hours === 0) {
        return `${minutes}m`; 
      } else {
        return `${hours}h ${minutes}m`;
      }
    } else {
      return `${days}d ${hours}h ${minutes}m`;
    }
  }

function animateProgressBar(selector, initialWidth, finalWidth) {
    var elem = document.querySelector(selector);
    var width = initialWidth;

    // Check if finalWidth is greater than or equal to initialWidth
    if (finalWidth > initialWidth) {
        var main = setInterval(frame, 50);
        function frame() {
            if (width >= finalWidth) {
                width = finalWidth; // Ensure width doesn't exceed finalWidth
                clearInterval(main);
            } else {
                width++;
                elem.style.width = width + "%";
            }
        }
    } else {
        // If finalWidth is equal to initialWidth, set it directly
        elem.style.width = width + "%";
    }
}

function closePopup() {
    document.querySelector(".plane-progress").style.width = "0%";
    document.querySelector(".train-progress").style.width = "0%";
    document.querySelector(".bus-progress").style.width = "0%";
    
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}