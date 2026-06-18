import type { IScrollButton } from '../interfaces/IScrollButton'
import '../styles/WeatherScrollButton.css'

export default function ScrollButton({scrollSide,onClick}:IScrollButton) {
    return (
        <button className="Weather-scroll-button" onClick={onClick}style={scrollSide == 'right' ? {right:0} : {left:0}}>{scrollSide == 'right' ? ">" : "<"}</button>
    )
}