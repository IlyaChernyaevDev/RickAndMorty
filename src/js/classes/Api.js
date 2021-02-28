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

  async getEpisode(episodeUrl) {
    return await fetch(episodeUrl).
                  then(episode => episode.json()).
                  catch(error => console.log(`Не удалось получить серию. Ошибка: ${error}`));
  }
}