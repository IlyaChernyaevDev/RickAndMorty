export default class Api {
  constructor(url) {
    this.url = url;
  }

  async getCharacters() {
    return await fetch(this.url).
                  then(characters => characters.json()).
                  then(characters => characters.results).
                  catch(error => console.log(`Не удалось получить персонажей. Ошибка: ${error}`));
  }
}