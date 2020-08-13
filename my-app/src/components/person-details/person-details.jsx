import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service'

import './person-details.css';
import Spinner from '../spinner/spinner';

export default class PersonDetails extends Component {

  state = {
    person: null,
    loading: true
  }

  swapiService = new SwapiService()

  componentDidMount() {
    this.updatePerson()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.personId != this.props.personId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return
    }
    this.setState({ loading: true })
    this.swapiService.getPerson(personId)
      .then(person => this.setState({ person }))
      .then(() => this.setState({ loading: false }))

  }



  render() {
    let content = this.state.loading ? <Spinner /> : <PersonBox person={this.state.person} />
    if (!this.state.person) content = <CastomSpinner />
    return (
      <div className="person-details card">
        {content}
      </div>
    )
  }
}


const CastomSpinner = (props) => {
  return (
    <div className="castomSpinner">
      <Spinner />
      <span>Please choose character</span>
    </div>
  )
}
const PersonBox = (person) => {
  const { id, name, gender, birthYear, eyeColor, starship } = person.person
  return (
    <React.Fragment>
      <img className="person-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />
      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
          {/* <li className="list-group-item">
          <span className="term">Starship</span>
          <span>{starship[1]}</span>
        </li> */}
        </ul>
      </div>
    </React.Fragment>
  )
}
