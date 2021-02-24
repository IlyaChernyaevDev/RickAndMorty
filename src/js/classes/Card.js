export default class Card {
  constructor(parentElement) {
    this.parentElement = parentElement;
  }

  createCharecterCard(character) {
    return `<div class="character-card">
              <div class="character-card__image-wrapper">
                <img src="${character.image}" alt="${character.name}" class="character-card__image">
              </div>
              <h2 class="character-card__name">${character.name}</h2>
              <p class="character-card__status_${character.status === 'Alive' ? 'alive' : 'dead'}">${character.status} - ${character.gender}</p>
              <p class="character-card__species">${character.species}</p>
              <p class="character-card__type">${character.type}</p>
            </div>`;
  }

  addCharacterCards(charactersArray) {
    charactersArray.then(characters => {
      for(let index in characters) {
        this.parentElement.insertAdjacentHTML('beforeend', this.createCharecterCard(characters[index]));
      }
    });

  }
}