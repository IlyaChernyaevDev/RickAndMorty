export default class Card {
  constructor(parentElement, paginator) {
    this.parentElement = parentElement;
    this.paginator = paginator;
  }

  createCharecterCard(character) {
    return `<div class="character-card" id="${character.id}">
              <div class="character-card__image-wrapper">
                <img src="${character.image}" alt="${character.name}" class="character-card__image">
              </div>
              <h2 class="character-card__name">${character.name}</h2>
              <p class="character-card__origin">Origin: <br>${character.origin.name}</p>
            </div>`;
  }

  addCharacterCards(charactersData) {
    this.parentElement.innerHTML = '';

    charactersData.then(characters => {

      this.paginator.addPaginators(this.paginator.createPaginator(characters.info));

      for(let index in characters.results) {
        this.parentElement.insertAdjacentHTML('beforeend', this.createCharecterCard(characters.results[index]));
      }

    });
  }

}