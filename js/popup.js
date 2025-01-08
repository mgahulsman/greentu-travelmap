let planeInterval;
let trainInterval;
let busInterval


function showPopup(cityData) {
    const popup = document.getElementById('popup');
    const title = document.getElementById('popup-title');
    title.textContent = `${cityData.name}`;
    popup.style.display = 'block';

    if (cityData.planeTime == "00:00:00" && cityData.planeEmission == 0.0){
      document.getElementById('plane').style.display = "none";
    }else{
      document.getElementById('plane').style.display = "block";
    }
    if (cityData.trainTime == "00:00:00" && cityData.trainEmission == 0.0){
      document.getElementById('train').style.display = "none";
    }else{
      document.getElementById('train').style.display = "block";
    }
    if (cityData.busTime == "00:00:00" && cityData.busEmission == 0.0){
      document.getElementById('bus').style.display = "none";
    }else{
      document.getElementById('bus').style.display = "block";
    }
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
    planeInterval = animateProgressBar('.plane-progress', startProgress, flightEmissionPercentage);
    trainInterval = animateProgressBar('.train-progress', startProgress, trainEmissionPercentage);
    busInterval = animateProgressBar('.bus-progress', startProgress, busEmissionPercentage);
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
  const elem = document.querySelector(selector);
  let width = initialWidth;
  let intervalId;

  if (finalWidth > initialWidth) {
      intervalId = setInterval(() => {
          if (width >= finalWidth) {
              clearInterval(intervalId);
          } else {
              width++;
              elem.style.width = width + "%";
          }
      }, 1); // Pas de interval aan voor snelheidscontrole (bijv. 20, 30, etc.)
  } else {
      elem.style.width = width + "%";
  }

  return intervalId; 
}

function closePopup() {
    clearInterval(planeInterval);
    clearInterval(trainInterval);
    clearInterval(busInterval);

    document.querySelector(".plane-progress").style.width = "0%";
    document.querySelector(".train-progress").style.width = "0%";
    document.querySelector(".bus-progress").style.width = "0%";
    
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}