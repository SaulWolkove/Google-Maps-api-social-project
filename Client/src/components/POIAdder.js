import usePlacesAutoComplete, {getGeocode, getLatLng,} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css"
import { useState, Fragment} from "react";
import "./styles/dashboard.css"




export default function POIAdder({handlePOIChange, POI, handleKeyPress}){
    const {
        ready, 
        value, 
        setValue, 
        suggestions: {status, data}, 
        clearSuggestions} =
        usePlacesAutoComplete();
    
    const [caption, setCaption] = useState("")

    const handlePOISelect = async (val) => {
        setValue(val, false);
        clearSuggestions();
    }

    const handleChange = async () => {
        const results = await getGeocode({address: value});
        const {lat, lng} = await getLatLng(results[0]);
        const newPOI = {value, caption, lat, lng}
        handlePOIChange(newPOI)
        setValue("")
        setCaption("")
    }


    return(
        <div className="poi-adding-form">
            <div className="poi-title">Add Locations of Interest</div>
            <div className="POIForm">
                <Combobox onSelect={handlePOISelect}>
                    <ComboboxInput 
                    value={value} 
                    onChange={e=>setValue(e.target.value)} 
                    className="poi-input"
                    onKeyPress={handleKeyPress}
                    placeholder="Enter a Location"/>
                    <ComboboxPopover>
                        <ComboboxList>
                            {status==="OK" && data.map(({place_id, description}) => <ComboboxOption key = {place_id} value ={description}/>)}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>
                <input className="poi-caption-box" type="text" placeholder="Write a Caption" value={caption} onKeyPress={handleKeyPress} onChange={(e)=>{setCaption(e.target.value)}}/>
                <button className="poi-submit-button" type="button" onClick={handleChange}>Add</button>
            </div>
            <div className="poi-List">
                {POI.map((POI)=>{
                    return(
                        <div key={(Math.random()*100)} className="poi-item">Location: {POI.value} <br/>Caption: {POI.caption}</div>
                    )
                })}
            </div>
        </div>
    )
}