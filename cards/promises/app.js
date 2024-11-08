document.addEventListener('DOMContentLoaded', () => {
  let baseURL = 'https://deckofcardsapi.com/api/deck'

  // 1. Draw a single card from a newly shuffled deck
  fetch(`${baseURL}/new/draw/`)
    .then(data => {
      let {suit, value} = data.cards[0]
      console.log(`${value.toLowerCase()} pf ${suit.toLowerCase()}`);
    })
    .catch(err => console.error("Error fetching data"))

  // 2. Draw two cards sequentially from the same deck
  let firstCard = null
  fetch(`${baseURL}/new/draw`)
    .then(response => response.json())
    .then(data => {
      firstCard = data.cards[0]
      let deckId = data.deck_id
      return fetch(`${baseURL}/${deckId}/draw/`)
    })
    .then(response => response.json())
    .then(data => {
      let secondCard = data.cards[0]
      [firstCard, secondCard].forEach(card => {
        console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`)
      })
    })
    .catch(err => console.error("Error fetching data:", err))

  // 3. Draw cards with a button click
  let deckId = null
  let button = document.querySelector('button')
  let cadArea = document.getElementById('card-area')

  fetch(`${baseURL}/new/shuffle/`)
    .then(response => response.json())
    .then(data => {
      deckId = data.deck_id
      button.style.display = 'block'
    })
    .catch(err => console.error("Error fetching data:", err))

  button.addEventListener('click', () => {
    fetch (`${baseURL}/${deckId}/draw/`)
      .then(response => response.json())
      .then(data => {
        let cardSrc = data.cards[0].image
        let angle = Math.random() * 90 - 45
        let randomX = Math.random() * 40 - 20
        let randomY = Math.random() * 40 - 20

        let img = document.createElement('img')
        img.src = cardSrc
        img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
        cardArea.appendChild(img)

        if (data.remaining === 0) button.remove()
      })
      .catch(err => console.error("Error fetching data", err))
  })
})