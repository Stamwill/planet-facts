// Hamburger elements
const hamburgerNav = document.getElementById('hamburgerNav')
const hamburger = document.getElementById('hamburger')

// Planet navigation
const planetNav = document.getElementById('planetNavigation')
const planetNavBar = document.getElementById('planetNavbar')
const planetNavItem = document.querySelectorAll('planetNavbar')

const openHamburgerMenu = () => {
  fetch('../../data.json')
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      for (let i = 0; i < json.length; i++) {
        let planet = document.createTextNode(`${json[i].name}`)
        createHamburgerLink(planet, i)
      }
    })
}

openHamburgerMenu()

const createHamburgerLink = (planet, index) => {
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

  // Add click event listener to navigate to the selected planet
  navItem.addEventListener('click', () => {
    navigateToPlanet(index)

    hamburgerNav.classList.remove('hamburgerOpen')
    hamburgerNav.classList.add('hamburgerNav')
  })
}

const navigateToPlanet = (index) => {
  fetch('../../data.json')
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      const selectedPlanet = json[index]
      displayPlanetData(selectedPlanet)
    })
}

const fetchPlanetData = () => {
  return fetch('../../data.json')
    .then((response) => response.json())
    .then((json) => {
      const initialPlanet = json[0]
      displayPlanetData(initialPlanet)

      // Attach click event listener to each navigation item
      const navItems = document.querySelectorAll('.navItem')
      navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
          const selectedPlanet = json[index]
          displayPlanetData(selectedPlanet)
        })
      })

      // Attach click event listener to each planetNavbar item
      const planetNavItems = document.querySelectorAll('.planetNavItem')
      planetNavItems.forEach((item) => {
        item.addEventListener('click', () => {
          const selectedTab = item.textContent
          displayPlanetData(currentPlanet, selectedTab)
        })
      })
    })
    .catch((error) => {
      console.error('Error fetching planet data:', error)
    })
}

const displayPlanetData = (planet, selectedTab) => {
  const name = planet.name
  const navDescription = getTabContent(planet, selectedTab)
  const wikipediaLink = planet.overview.source
  const dataRot = planet.rotation
  const dataRev = planet.revolution
  const dataRad = planet.radius
  const dataTem = planet.temperature

  createPlanetPage(
    name,
    navDescription,
    wikipediaLink,
    planet,
    selectedTab,
    dataRot,
    dataRev,
    dataRad,
    dataTem,
  )
  createPlanetMeasurements(dataRot, dataRev, dataRad, dataTem)

  currentPlanet = planet
}

const createPlanetPage = (name, navDescription, wikipediaLink, planet, selectedTab) => {
  const planetName = document.getElementById('planetName')
  const planetNavDescription = document.getElementById('planetNavDescription')
  const wikiLink = document.getElementById('wikiLink')
  const planetImageContainer = document.getElementById('planetImageContainer')

  const imagesForTab = getImagesForTab(planet, selectedTab)

  planetName.textContent = name
  planetNavDescription.innerHTML = navDescription
  wikiLink.href = wikipediaLink

  // Clear previous images
  planetImageContainer.innerHTML = ''

  // Append new images to the container
  imagesForTab.forEach((imageUrl) => {
    const imageElement = document.createElement('img')
    imageElement.src = imageUrl
    imageElement.classList.add('secondPlanetImg')
    planetImageContainer.appendChild(imageElement)
  })
}

const getImagesForTab = (planet, tab) => {
  switch (tab) {
    case 'Overview':
      return [planet.images.planet]
    case 'Structure':
      return [planet.images.internal]
    case 'Surface':
      return [planet.images.internal, planet.images.geology]
    default:
      return [planet.images.planet]
  }
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

const getTabContent = (planet, tab) => {
  switch (tab) {
    case 'Overview':
      return planet.overview.content
    case 'Structure':
      return planet.structure.content
    case 'Surface':
      return planet.geology.content
    default:
      return planet.overview.content
  }
}

let currentPlanet

fetchPlanetData()

hamburger.addEventListener('click', () => {
  hamburgerNav.classList.toggle('hamburgerNav')
  hamburgerNav.classList.toggle('hamburgerOpen')
})
