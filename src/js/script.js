import '../scss/main.scss';
import Api from './classes/Api';
import Card from './classes/Card';

(function() {
  const serverUrl = `https://rickandmortyapi.com/api`;
  const CHARACTER_URL = `${serverUrl}/character`;
  const cardsContainer = document.querySelector('.characters__cards');

  const characters = new Api(CHARACTER_URL);
  const charactersCard = new Card(cardsContainer);

  charactersCard.addCharacterCards(characters.getCharacters());
}());