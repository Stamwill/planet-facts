const main = document.getElementById('main')

const hamburgerNav = document.getElementById('hamburgerNav')

const hamburger = document.getElementById('hamburger')

hamburger.addEventListener('click', () => {
  if (hamburgerNav.classList == 'hamburgerNav') {
    hamburgerNav.classList.remove('hamburgerNav')
    hamburgerNav.classList.add('hamburgerOpen')
  } else {
    hamburgerNav.classList.remove('hamburgerOpen')
    hamburgerNav.classList.add('hamburgerNav')
  }
})

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
