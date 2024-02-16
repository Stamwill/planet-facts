// Hamburger elements
const hamburgerNav = document.getElementById('hamburgerNav')
const hamburger = document.getElementById('hamburger')

// Main elements
const main = document.getElementById('main')
const planetPage = document.getElementById('planetPage')

// Planet navigation
const planetNav = document.getElementById('planetNavigation')
const planetNavBar = document.getElementById('planetNavbar')
const planetNavItem = document.querySelector('planetNavItem')

// Planet block
const planetBlock = document.querySelector('planetBlock')

// Data panel
const dataPanel = document.querySelector('dataPanel')
const dataItem = document.querySelector('dataItem')

const openHamburgerMenu = () => {
  fetch('../../data.json')
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      for (let i = 0; i < json.length; i++) {
        let planet = document.createTextNode(`${json[i].name}`)
        createHamburgerLink(planet)
      }
    })
}
openHamburgerMenu()

const createHamburgerLink = (planet) => {
  let container = document.createElement('div')
  let navItem = document.createElement('div')
  let navItemText = document.createElement('h3')
  let img = document.createElement('img')
  img.src = '../assets/icon-chevron.svg'

  container.classList.add('hamburgerItemContainer')
  navItem.classList.add('hamburgerItem')
  navItemText.classList.add('hamburgerItemText')

  hamburgerNav.appendChild(container)
  container.appendChild(navItem)
  navItem.appendChild(navItemText)
  navItem.appendChild(img)
  navItemText.appendChild(planet)
}

const fetchPlanetData = () => {
  fetch('../../data.json')
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      for (let i = 0; i < 1; i++) {
        let name = json[i].name
        let navDescription = json[i].overview.content
        let wikipediaLink = json[i].overview.source
        let planetImg = json[i].images.planet
        console.log(wikipediaLink)
        createPlanetPage(name, navDescription, wikipediaLink, planetImg)

        let dataRot = json[i].rotation
        let dataRev = json[i].revolution
        let dataRad = json[i].radius
        let dataTem = json[i].temperature
        createPlanetMeasurements(dataRot, dataRev, dataRad, dataTem)
      }
    })
}

fetchPlanetData()
const createPlanetPage = (name, navDescription, wikipediaLink, planetImg) => {
  const planetName = document.getElementById('planetName')
  const planetNavDescription = document.getElementById('planetNavDescription')
  const wikiLink = document.getElementById('wikiLink')
  const planetImage = document.getElementById('planetImg')

  planetName.textContent = name
  planetNavDescription.textContent = navDescription
  wikiLink.src = wikipediaLink
  planetImage.src = planetImg
}

const createPlanetMeasurements = (dataRot, dataRev, dataRad, dataTem) => {
  const dataRotation = document.getElementById('dataRotation')
  const dataRevolution = document.getElementById('dataRevolution')
  const dataRadius = document.getElementById('dataRadius')
  const dataTemp = document.getElementById('dataTemp')

  dataRotation.textContent = dataRot
  dataRevolution.textContent = dataRev
  dataRadius.textContent = dataRad
  dataTemp.textContent = dataTem
}

// Event Handlers
hamburger.addEventListener('click', () => {
  if (hamburgerNav.classList == 'hamburgerNav') {
    hamburgerNav.classList.remove('hamburgerNav')
    hamburgerNav.classList.add('hamburgerOpen')
  } else {
    hamburgerNav.classList.remove('hamburgerOpen')
    hamburgerNav.classList.add('hamburgerNav')
  }
})
