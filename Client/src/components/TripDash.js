import "./styles/tripMenu.css"



export default function TripDash(props){
    return(
        <div>
            <button onClick={props.removeTripDash} className="back-button">Return</button>
        </div>
    )
}