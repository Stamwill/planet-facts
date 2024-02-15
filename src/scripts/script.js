const hamburgerNav = document.getElementById('hamburgerNav')
const hamburger = document.getElementById('hamburger')

// Main elements
const main = document.getElementById('main')
const planetPage = document.getElementById('planetPage')

// Planet navigation
const planetNav = document.getElementById('planetNavigation')
const planetNavBar = document.getElementById('planetNavbar')
const planetNavItem = document.querySelector('planetNavItem')

// Planet page image
const planetImg = document.getElementById('planetImg')

// Planet block
const planetBlock = document.querySelector('planetBlock')
const planetName = document.querySelector('planetName')
const planetNavDescription = document.querySelector('planetNavDescription')
const wikiLink = document.querySelector('wikiLink')

// Data panel
const dataPanel = document.querySelector('dataPanel')
const dataItem = document.querySelector('dataItem')
const dataDescription = document.querySelector('dataDescription')
const dataMeasurement = document.querySelector('dataMeasurement')

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

openHamburgerMenu()

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
