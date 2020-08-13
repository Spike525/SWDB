export default class SwapiService {

  _apiBase = 'https://swapi.dev/api'

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`)
    if (!res.ok) {
      throw Error(`Could not fetch ${url}` + `received ${res.status}`)
    }
    return await res.json()
  };

  async getAllPeople() {
    const res = await this.getResource(`/people/?page=1`);
    return res.results.map(this._transformPeople)
  }
  async getPerson(id) {
    const res = await this.getResource(`/people/${id}`)
    return this._transformPeople(res)
  }
  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet)
  }
  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}`)
    console.log(planet);
    return this._transformPlanet(planet)
  }
  async getAllStarspips() {
    const res = await this.getResource(`/starships/`);
    return res.results
  }
  getStarship(id) {
    return this.getResource(`/starships/${id}`)
  }

  _extractPlanetId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  }
  _extractPerosnId(person) {
    const idRegExp = /\/([0-9]*)\/$/;
    return person.url.match(idRegExp)[1];
  }

  _transformPlanet = (planet) => {
    return {
      id: this._extractPlanetId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    }
  }

  _transformPeople = (people) => {
    
    return {
      name: people.name,
      id: this._extractPerosnId(people),
      gender: people.gender,
      birthYear: people.birth_year,
      eyeColor: people.eye_color,
      starship: people.starships[0] || "n/a"
  }}

} 