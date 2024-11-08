document.addEventListener('DOMContentLoaded',() => {
  let baseURL = 'https://deckofcardsapi.com/api/deck'

  // 1. Draw a single card from a newly shuffled deck
  async function partOne(){
    let response = await fetch(`${baseURL}/new/draw`)
    let data = await response.json()
    let { suit, value } = data.cards[0]
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()} `);
  }

  // 2. Draw two cards from the same deck
  async function partTwo() {
    let response = await fetch(`${baseURL}/new/draw/`)
    let firstCardData = await response.json()
    let deckId = firstCardData.deck_id

    let secondResponse = await fetch(`${baseURL}/${deckId}/draw/`)
    let secondCardData = await secondResponse.json()

    [firstCardData, secondCardData].forEach(cardData => {
      let {suit,value} = cardData.cards[0]
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    })
  }

  // 3. Draw cards with a button click
  async function setup() {
    let button = document.querySelector('button')
    let cardArea = document.getElementById('card-area')

    let response = await fetch(`${baseURL}/new/shuffle/`)
    let deckData = await response.json()
    button.style.display = 'block'

    button.addEventListener('click', async function(){
      let cardResponse = await fetch(`${baseURL}/${deckData.deck_id}/draw/`)
      let cardData = await cardResponse.json()
      let cardSrc = cardData.cards[0].image
      let angle = Math.random() * 90 -45
      let randomX = Math.random() * 40 -20
      let randomY = Math.random() * 40 - 20

      let img = document.createElement('img')
      img.src = cardSrc
      img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
      cardArea.appendChild(img)

      if (cardData.remaining === 0) button.remove()
    })
  }
  setup()
})