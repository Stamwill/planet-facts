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
  hamburgerNav.appendChild(planet)
}

openHamburgerMenu()
