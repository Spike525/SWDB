import React from 'react'
import SwapiService from '../../services/swapi-service';

import './random-planet.css'
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator/error-indicator';

class RandomPlanet extends React.Component {

  swapiService = new SwapiService()

  state = {
    planet: {},
    loading: true,
    error: false,
  }

  
  componentDidMount () {
    this.updatePlanet()
    this.interval = setInterval(this.updatePlanet, 10000)
  }

  onPlanetLoaded = (planet) => {
    this.setState({ planet, loading: false })
  }
  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  } 
  updatePlanet = () => {
    const id = Math.floor(Math.random() * 25 + 2)
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError)
  }

  checkImage = (id) => {
    fetch(`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`)
      .then(res => {res.ok?console.log("ok"):console.log("beeeeee");})
  } 

  render() {
    const {planet, loading, error} = this.state

    const hasData = !(error || loading);
    const spinner = loading? <Spinner />: null; 
    const errorMessage = error? <ErrorIndicator />: null;
    const content = hasData? <PlanetView planet={planet} />: null;
    

    
    return (
      <div className="random-planet">
            {errorMessage}
            {spinner}
            {content}
      </div>
    )
  }
}

const PlanetView = ({planet}) => {

  const { id, name, population, rotationPeriod, diameter } = planet

  return (
    <React.Fragment>
      <img className="planet-image" 
      src = {`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="" /> 
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
          <li className="list-group-item">
            <span className="term">id</span>
            <span>{id}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}

export default RandomPlanet