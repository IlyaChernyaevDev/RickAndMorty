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
              <button class="character-card__about">Learn more</button>
            </div>`;
  }

  addCharacterCards(charactersData) {

    charactersData.
      then(characters => {
        this.parentElement.innerHTML = '';

        this.paginator.addPaginators(this.paginator.createPaginator(characters.info));

        for(let index in characters.results) {
          this.parentElement.insertAdjacentHTML('beforeend', this.createCharecterCard(characters.results[index]));
        }

      }).
      catch((error) => {
        this.parentElement.innerHTML = '';
        this.paginator.paginatorContainer.innerHTML = '';
        this.parentElement.insertAdjacentHTML('beforeend', `<h2>Sorry, but this character don't exist in multiverse</h2>`);
      });
  }

  createLoader() {
    return `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
  }

  addLoader() {
    this.parentElement.insertAdjacentHTML('beforeend', this.createLoader());
  }

}