// Task 1: Get a Fact about a Favorite Number
const favoriteNum = 7;
const url = `http://numbersapi.com/${favoriteNum}?json`;

// Clear or update the content of the facts container
function clearFactsContainer() {
  const factsContainer = document.getElementById('facts');
  if (factsContainer) {
    factsContainer.innerHTML = '';
  }
}

function getFavoriteNumberFact() {
  clearFactsContainer();
  fetch(url)
    .then(response => response.json())
    .then(data => {
      document.getElementById('facts').innerHTML += `<p>Fact about ${favoriteNum}: ${data.text}</p>`;
      console.log(data.text);
    })
    .catch(err => console.error("Error fetching data:", err));
}

// Task 2: Get Facts about Multiple Numbers
const numbers = [3, 7, 13, 42];
const multiUrl = `http://numbersapi.com/${numbers.join(",")}?json`;

function getMultipleNumbersFacts() {
  clearFactsContainer();
  fetch(multiUrl)
    .then(response => response.json())
    .then(data => {
      for (let num in data) {
        document.getElementById('facts').innerHTML += `<p>Fact about ${num}: ${data[num]}</p>`;
        console.log(data[num]);
      }
    })
    .catch(err => console.error("Error fetching data:", err));
}

// Task 3: Get 4 Facts about the Favorite Number
function getMultipleNumbersFactsForFavoriteNumber() {
  clearFactsContainer();
  const requests = Array.from({ length: 4 }, () => fetch(url));

  Promise.all(requests)
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(facts => {
      const uniqueFacts = new Set();
      facts.forEach(data => {
        if (!uniqueFacts.has(data.text)) {
          uniqueFacts.add(data.text);
          document.getElementById('facts').innerHTML += `<p>Fact: ${data.text}</p>`;
          console.log(data.text);
        }
      });
    })
    .catch(err => console.error("Error fetching data:", err));
}

// Event listeners for buttons
document.getElementById('challenge1').addEventListener('click', getFavoriteNumberFact);
document.getElementById('challenge2').addEventListener('click', getMultipleNumbersFacts);
document.getElementById('challenge3').addEventListener('click', getMultipleNumbersFactsForFavoriteNumber);
