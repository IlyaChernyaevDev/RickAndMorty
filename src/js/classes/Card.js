export default class Card {
  constructor(parentElement) {
    this.parentElement = parentElement;
  }

  createCharecterCard(character) {
    return `<div class="character-card" id="${character.id}">
              <div class="character-card__image-wrapper">
                <img src="${character.image}" alt="${character.name}" class="character-card__image">
              </div>
              <h2 class="character-card__name">${character.name}</h2>
            </div>`;
  }

  addCharacterCards(charactersData) {
    this.parentElement.innerHTML = '';

    charactersData.then(characters => {
      this.addPaginators(document.querySelector('.paginator'), this.createPaginatorLinks(characters.info));

      for(let index in characters.results) {
        this.parentElement.insertAdjacentHTML('beforeend', this.createCharecterCard(characters.results[index]));
      }

    });
  }

  createPaginatorLinks(charactersInfo) {
    const numberPages = charactersInfo.pages;

    if(!charactersInfo.next && !charactersInfo.prev) return '';

    const pageUrl = charactersInfo.next ? charactersInfo.next : charactersInfo.prev;
    const paginatorArray = [];

    for(let i = 0, j = 1; i <= numberPages - 1; i++,j++) {
      paginatorArray.push(`<a href="${pageUrl.replace(/page=\d+/, `page=${j}`)}" class="paginator__page-number">${j}</a>`);
    }

    return paginatorArray.join('\n');
  }

  addPaginators(paginatorContainer, paginators) {
    paginatorContainer.innerHTML = '';
    paginatorContainer.insertAdjacentHTML('beforeend', paginators);
  }

}

// {/* <p class="character-card__status_${character.status === 'Alive' ? 'alive' : 'dead'}">Status: ${character.status}</p>
// <p class="character-card__gender">${character.gender}</p>
// <p class="character-card__species">${character.species}</p>
// <p class="character-card__type">${character.type}</p> */}