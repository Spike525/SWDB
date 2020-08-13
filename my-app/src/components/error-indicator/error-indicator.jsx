import React from 'react'
import './error-indicator.css'
import icon from './death-star.png'

const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <img src={icon} alt=""/>
            <div className="boom">BOOM!</div>
            <div >
                something has gone terribly wrong
            </div>
            <div>
                (but we already sent droids to fix it)
            </div>
        </div>
    )
}

export default ErrorIndicator