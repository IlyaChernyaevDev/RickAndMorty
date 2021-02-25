export default class Api {
  constructor(url) {
    this.url = url;
  }

  async getCharacters(characterName = '') {
    return await fetch(this.url + characterName).
                  then(characters => characters.json()).
                  then(characters => characters).
                  catch(error => console.log(`Не удалось получить персонажей. Ошибка: ${error}`));
  }
}