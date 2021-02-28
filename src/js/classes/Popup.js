export default class Popup {
  constructor(popupContainer, popupTrigger, api) {
    this.popupContainer = popupContainer;
    this.popupTrigger = popupTrigger;
    this.api = api;
  }

  addListenerPopup() {
    this.popupTrigger.addEventListener('click', (event) => this.renderPopup(event));

    this.popupContainer.addEventListener('click', (event) => this.closePopup(event.target));
  }

  renderPopup(event) {
    event.preventDefault();
    if (event.target.matches('.character-card__about')) {

      let character;

      const target = event.target.closest('.character-card');

      this.api.url = this.api.url.replace(/\d+/g, target.id);

      this.api.getCharacters().
      then(characterInfo => {

        character = characterInfo;

        return this.api.getEpisode(characterInfo.episode[0]);
      }).
      then(episodeInfo => {
        this.popupContainer.insertAdjacentHTML('beforeend', this.createPopup(character, episodeInfo.name));
      });

      this.openPopup(this.popupContainer);
    }
  }




  createPopup(characterInfo, firstEpisodeName) {
    return `<div class="character-popup">
              <img src="${characterInfo.image}" alt="${characterInfo.name} image" class="character-popup__image">
              <h2 class="character-popup__name">${characterInfo.name}</h2>
              <div class="character-popup__description">
                <p class="character-popup__parameter character-popup__parameter_bold">Status:</p>
                <p class="character-popup__parameter">${characterInfo.status}</p>
                <p class="character-popup__parameter character-popup__parameter_bold">Species:</p>
                <p class="character-popup__parameter">${characterInfo.species}</p>
                <p class="character-popup__parameter character-popup__parameter_bold">Gender:</p>
                <p class="character-popup__parameter">${characterInfo.gender}</p>
                <p class="character-popup__parameter character-popup__parameter_bold">Originally from:</p>
                <p class="character-popup__parameter">${characterInfo.origin.name}</p>
                <p class="character-popup__parameter character-popup__parameter_bold">Last known location:</p>
                <p class="character-popup__parameter">${characterInfo.location.name}</p>
                <p class="character-popup__parameter character-popup__parameter_bold">Number of episodes:</p>
                <p class="character-popup__parameter">${characterInfo.episode.length}</p>
                <p class="character-popup__parameter character-popup__parameter_bold">First seen in:</p>
                <p class="character-popup__parameter">${firstEpisodeName}</p> 
              </div>
            </div>`;
  }

  openPopup(popup) {
    popup.style.display = 'block';
  }

  closePopup(popup) {
    if (popup && popup.matches('.popup')) {
      popup.style.display = 'none';
      this.removePopup(popup);
    }
  }

  removePopup(popup) {
    popup.innerHTML = '';
  }
}