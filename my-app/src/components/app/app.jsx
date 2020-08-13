import React from 'react'
import Header from '../header/header'
import RandomPlanet from '../random-planet/random-planet'
import ItemList from '../item-list/item-list'
import PersonDetails from '../person-details/person-details'


import './app.css'
import SwapiService from '../../services/swapi-service'
import ErrorBtn from '../error-btn/error-btn'
import ErrorIndicator from '../error-indicator/error-indicator'

class App extends React.Component {
    state = {
        selectedPerson: null,
        hasError: false
    };


    swapiService = new SwapiService()

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        })
    }

    componentDidCatch() {
        this.setState({hasError:true})
    }

    render() {
        if(this.state.hasError) {return <ErrorIndicator/> }
        return (
            <div className="my-app container-md">
                <Header />
                <RandomPlanet />
                <ErrorBtn />
                <div className="row md-2 content-body">
                    <div className="col-md-6">
                        <ItemList onItemSelected={this.onPersonSelected} />
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson}/> 
                    </div>
                </div>
            </div>
        )
    }
}


export default App