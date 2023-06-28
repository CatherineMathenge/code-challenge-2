// Retrieve character data from db.json
function getCharacterData() {
    return fetch('db.json')
      .then(response => response.json())
      .then(data => data.characters)
      
  }
  
  // Display list of animals
  function displayAnimalList() {
    const animalList = document.getElementById('animal-list');
  
    getCharacterData()
      .then(characters => {
        characters.forEach(character => {
          const listItem = document.createElement('li');
          const link = document.createElement('a');
          link.href = '#';
          link.textContent = character.name;
  
          link.addEventListener('click', () => {
            displayCharacterDetails(character.id);
          });
  
          listItem.appendChild(link);
          animalList.appendChild(listItem);
        });
      });
  }
  
  // Display character details
  function displayCharacterDetails(characterId) {
    const detailsContainer = document.getElementById('character-details');
  
    getCharacterData()
      .then(characters => {
        const character = characters.find(char => char.id === characterId);
  
        if (character) {
          detailsContainer.innerHTML = `
            <h2>${character.name}</h2>
            <img src="${character.image}" alt="${character.name}" width="200">
            <p>Votes: ${character.votes}</p>
            <button onclick="voteForCharacter(${character.id})">Vote</button>
          `;
        } else {
          detailsContainer.innerHTML = '<p>Character not found</p>';
        }
      });
  }
  
  // Vote for a character
  function voteForCharacter(characterId) {
    getCharacterData()
      .then(characters => {
        const character = characters.find(char => char.id === characterId);
  
        if (character) {
          character.votes += 1;
          console.log('Vote recorded for', character.name);
          console.log('Updated votes:', character.votes);
          displayCharacterDetails(characterId);
        } 
      });
  }
  
  // Call the function to display the animal list
  displayAnimalList();
  