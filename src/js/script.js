import '../scss/main.scss';
import Api from './classes/Api';
import Card from './classes/Card';
import Popup from './classes/Popup';

(function() {
  const serverUrl = `https://rickandmortyapi.com/api`;
  const CHARACTER_URL = `${serverUrl}/character`;
  const cardsContainer = document.querySelector('.characters__cards');
  const paginatorContainer = document.querySelector('.paginator');
  const popupContainer = document.querySelector('.popup');

  const characters = new Api(CHARACTER_URL);
  const charactersCard = new Card(cardsContainer);
  const popupCharacter = new Popup(popupContainer, cardsContainer, new Api(`${CHARACTER_URL}/1`));

  charactersCard.addCharacterCards(characters.getCharacters());
  popupCharacter.addListenerPopup();


  paginatorContainer.addEventListener('click', function(event) {
    event.preventDefault();
    const target = event.target;
    charactersCard.addCharacterCards(new Api(target.href).getCharacters());
  });

  // Sorry, but this character don't exist in multiverse

  // Функционал для поиска и отрисовки карточек персонажей 
  const searchForm = document.querySelector('.characters__form');
  const searchInput = document.querySelector('.characters__form-search');
  searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log(searchInput.value);
    charactersCard.addCharacterCards(characters.getCharacters(`?name=${searchInput.value}`));
    searchInput.value = '';
  });
  
}());