import '../scss/main.scss';
import Api from './classes/Api';
import Card from './classes/Card';
import Popup from './classes/Popup';
import Paginator from './classes/Paginator';

(function() {
  const serverUrl = `https://rickandmortyapi.com/api`;
  const CHARACTER_URL = `${serverUrl}/character/`;
  const cardsContainer = document.querySelector('.characters__cards');
  const paginatorContainer = document.querySelector('.paginator');
  const popupContainer = document.querySelector('.popup');
  const searchForm = document.querySelector('.characters__form');
  const searchInput = document.querySelector('.characters__form-search');

  const characters = new Api(CHARACTER_URL);
  const paginator = new Paginator(paginatorContainer, characters);
  const charactersCard = new Card(cardsContainer, paginator);
  const popupCharacter = new Popup(popupContainer, cardsContainer, new Api(`${CHARACTER_URL}1`));

  charactersCard.addCharacterCards(characters.getCharacters());
  popupCharacter.addListenerPopup();

  paginatorContainer.addEventListener('click', function(event) {
    event.preventDefault();
    const target = event.target;
    if(target && target.matches('a.paginator__page')) {

      charactersCard.addCharacterCards(new Api(target.href).getCharacters());
    }
  });

  searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    charactersCard.addLoader();
    charactersCard.addCharacterCards(characters.getCharacters(`?name=${searchInput.value}`));
    searchInput.value = '';
  });

}());