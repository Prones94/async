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

async function getFavoriteNumberFact() {
  clearFactsContainer();
  const res = await fetch(url);
  const data = await res.json();
  document.getElementById('facts').innerHTML += `<p>Fact about ${favoriteNum}: ${data.text}</p>`;
  console.log(data.text);
}

// Task 2: Get Facts about Multiple Numbers
const numbers = [3, 7, 13, 42];
const multiUrl = `http://numbersapi.com/${numbers.join(",")}?json`;

async function getMultipleNumbersFacts() {
  clearFactsContainer();
  const response = await fetch(multiUrl);
  const data = await response.json();
  for (let num in data) {
    document.getElementById('facts').innerHTML += `<p>Fact about ${num}: ${data[num]}</p>`;
    console.log(data[num]);
  }
}

// Task 3: Get 4 Facts about the Favorite Number
async function getMultipleNumbersFactsForFavoriteNumber() {
  clearFactsContainer();
  const requests = Array.from({ length: 4 }, () => fetch(url));
  const responses = await Promise.all(requests);
  const facts = await Promise.all(responses.map(response => response.json()));
  const uniqueFacts = new Set();
  facts.forEach(data => {
    if (!uniqueFacts.has(data.text)) {
      uniqueFacts.add(data.text);
      document.getElementById('facts').innerHTML += `<p>Fact: ${data.text}</p>`;
      console.log(data.text);
    }
  });
}


// Event listeners for buttons
document.getElementById('challenge1').addEventListener('click', getFavoriteNumberFact);
document.getElementById('challenge2').addEventListener('click', getMultipleNumbersFacts);
document.getElementById('challenge3').addEventListener('click', getMultipleNumbersFactsForFavoriteNumber);
