
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".sidebar nav a");

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            links.forEach((l) => {
                l.classList.remove("active");
                l.removeAttribute("aria-current");
            });

            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        });
    });
});

const form = document.querySelector('#search-form')
const input = document.querySelector('#city-input')

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const name = input.value

    const data = await searchCity(name)

    console.log(data.location, data.current)
    
    input.value = ""
    cityName.textContent =`${data.location.name}, ${data.location.country}`
    condition.textContent = `${data.current.condition.text}`
    visibility.textContent = `${data.current.vis_km} km`
    airQuality.textContent = data.current.air_quality["us-epa-index"]
    
    afficher('feels-like', `${data.current.feelslike_c} °C`)
    afficher('temperature', `${data.current.temp_c} °C`)
    afficher('humidity', `${data.current.humidity} %`)
    afficher('wind', `${data.current.wind_kph} km/h`)
    afficher('pressure', `${data.current.pressure_mb} hPa`)
    afficher('visibility', `${data.current.vis_km} km`)
    afficher('uv', data.current.uv)

    const date = new Date(data.location.localtime)

    const dateFormatee = date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    })

    const heureFormatee = date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
    })

    dateTime.textContent = `${dateFormatee} • ${heureFormatee}`
    
    console.log(data)
})

async function searchCity(name){
    try {
        const reponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=8bf75f0c59bc499ab8c163519261708&q=${name}&aqi=yes`)
        
    
        if(!reponse.ok){
            console.log("La requette à echouer")
            return
        }
        const data = await reponse.json()

        return data
    }
    catch(e){
        console.log("Erreur reseaux",e)
    }
    
}

const cityName = document.querySelector('#city-name')
const condition = document.querySelector('#weather-condition')
const icon = document.querySelector ('#weather-icon')
const dateTime = document.querySelector('#date-time')
const airquality =  document.querySelector('#air-quality')
const visibility = document.querySelector('#visibility-main')
const airQuality = document.querySelector('#air-quality')



function afficher(classe, valeur) {
    const elements = document.querySelectorAll(`.${classe}`)

    elements.forEach(element => {
        element.textContent = valeur
    })
}





