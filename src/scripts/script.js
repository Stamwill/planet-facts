const hamburgerNav = document.getElementById('hamburgerNav')
const hamburger = document.getElementById('hamburger')
const planetNav = document.getElementById('planetNavigation')
const planetNavItem = document.querySelectorAll('.planetNavItem')

const openHamburgerMenu = () => {
  fetch('../../data.json')
    .then((response) => response.json())
    .then((json) => {
      json.forEach((planet, index) => {
        const planetTextNode = document.createTextNode(planet.name)
        createHamburgerLink(planetTextNode, index)
      })
    })
}

hamburger.addEventListener('click', () => {
  hamburgerNav.classList.toggle('hamburgerNav')
  hamburgerNav.classList.toggle('hamburgerOpen')
})

openHamburgerMenu()

const navigateToPlanet = async (index) => {
  const response = await fetch('../../data.json')
  const json = await response.json()
  const selectedPlanet = json[index]
  displayPlanetData(selectedPlanet)
}

const createHamburgerLink = (planet, index) => {
  const container = document.createElement('div')
  const navItem = document.createElement('div')
  const navItemText = document.createElement('h3')
  const img = document.createElement('img')
  img.src = '../assets/icon-chevron.svg'

  container.classList.add('hamburgerItemContainer')
  navItem.classList.add('hamburgerItem')
  navItemText.classList.add('hamburgerItemText')

  container.appendChild(navItem)
  navItem.appendChild(navItemText)
  navItem.appendChild(img)
  navItemText.appendChild(planet)

  navItem.addEventListener('click', () => {
    navigateToPlanet(index).then(() => {
      setTabsBackgroundColor(currentPlanet.name)
    })

    hamburgerNav.classList.remove('hamburgerOpen')
    hamburgerNav.classList.add('hamburgerNav')
  })

  hamburgerNav.appendChild(container)
}

const fetchPlanetData = async () => {
  try {
    const response = await fetch('../../data.json')
    const json = await response.json()
    const initialPlanet = json[0]
    displayPlanetData(initialPlanet)

    const navItems = document.querySelectorAll('.navItem')
    navItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        const selectedPlanet = json[index]
        displayPlanetData(selectedPlanet)
      })
    })

    const planetNavItems = document.querySelectorAll('.planetNavItem')
    planetNavItems.forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault()
        const selectedTab = item.textContent.trim()
        const selectedPlanet = currentPlanet.name
        displayPlanetData(currentPlanet, selectedTab)
        setTabsBackgroundColor(selectedPlanet, selectedTab)
      })
    })
  } catch (error) {
    console.error('Error fetching planet data:', error)
  }
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
  setTabsBackgroundColor(currentPlanet.name, selectedTab || 'Overview')
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

  planetImageContainer.innerHTML = ''

  imagesForTab.forEach((imageUrl) => {
    const imageElement = document.createElement('img')
    imageElement.src = imageUrl
    imageElement.classList.add('planetImg')
    planetImageContainer.appendChild(imageElement)
  })
}

const getImagesForTab = (planet, tab) => {
  if (tab === 'Overview') {
    return [planet.images.planet]
  } else if (tab === 'Structure' || tab === '02 Internal Structure') {
    return [planet.images.internal]
  } else if (tab === 'Surface' || tab === '03 Surface Geology') {
    return [planet.images.internal, planet.images.geology]
  } else {
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
  if (tab === 'Overview') {
    return planet.overview.content
  } else if (tab === 'Structure' || tab == '02 Internal Structure') {
    return planet.structure.content
  } else if (tab === 'Surface' || tab == '03 Surface Geology') {
    return planet.geology.content
  } else {
    return planet.overview.content
  }
}

fetchPlanetData()

document.addEventListener('DOMContentLoaded', () => {
  const planetOverview = document.getElementById('planetOverview')
  const planetStructure = document.getElementById('planetStructure')
  const planetSurface = document.getElementById('planetSurface')

  const updatePlanetNavbar = () => {
    if (window.innerWidth < 800) {
      planetOverview.textContent = 'Overview'
      planetStructure.textContent = 'Structure'
      planetSurface.textContent = 'Surface'
      setTabsBackgroundColor()
    } else if (window.innerWidth >= 800) {
      planetOverview.textContent = '01 Overview'
      planetStructure.textContent = '02 Internal Structure'
      planetSurface.textContent = '03 Surface Geology'
    }
  }

  updatePlanetNavbar()

  window.addEventListener('resize', updatePlanetNavbar)
})

const setTabsBackgroundColor = (planet, activeTab) => {
  const tabs = document.querySelectorAll('.planetNavItem')

  const planetColorMap = {
    Mercury: '--light-blue',
    Venus: '--yellow',
    Earth: '--purple',
    Mars: '--orange',
    Jupiter: '--red',
    Saturn: '--orange',
    Uranus: '--green',
    Neptune: '--blue',
  }

  const planetColorVariable = planetColorMap[planet]

  tabs.forEach((tab) => {
    const isCurrentTab = tab.textContent.trim() === activeTab
    const backgroundColor = isCurrentTab ? `var(${planetColorVariable})` : 'unset'

    tab.style.backgroundColor = backgroundColor

    if (window.innerWidth < 800) {
      tab.style.backgroundColor = 'unset'
    }
  })
}
