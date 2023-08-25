import "./styles/map.css"
import compass from "../assets/icons8-wind-rose-40.png"

export default function Header(){

    return(
        <div className="header">
            <img src={compass} className="icon"/>
            the Traveller Project

        </div>
    )
}