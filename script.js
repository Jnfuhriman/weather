window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const tempertatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "http://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/5b348593e7242e808dc3cf0bb3dc607e/${lat},${long}`;
            
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data => {
                const {temperature, summary, icon } = data.currently;
                // Set DOM elements from the API
                temperatureDegree.textContent = Math.floor(temperature);
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                //Formula for celsius
                let celsius = (temperature - 32) * (5/9);
                //set icon
                setIcons(icon, document.querySelector('.icon'));
                
                //change temp to celsius/farenheit
                temperatureSection.addEventListener('click', () =>{
                    if(tempertatureSpan.textContent === "F"){
                        tempertatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }
                    else{
                        tempertatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(temperature);
                    }
                })
            });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});