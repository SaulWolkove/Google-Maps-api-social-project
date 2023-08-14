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





export default function POIAdder({handlePOIChange, POI}){
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
    }


    return(
        <div className="container">
            <div className="POIForm">
                <Combobox onSelect={handlePOISelect}>
                    <ComboboxInput 
                    value={value} 
                    onChange={e=>setValue(e.target.value)} 
                    className="combobox-input"
                    placeholder="Enter a Location"/>
                    <ComboboxPopover>
                        <ComboboxList>
                            {status==="OK" && data.map(({place_id, description}) => <ComboboxOption key = {place_id} value ={description}/>)}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>
                <h3>Add a Caption</h3>
                <input type="text" value={caption} onChange={(e)=>{setCaption(e.target.value)}}/>
                <button type="button" onClick={handleChange}>Add this point of interest</button>
            </div>
            <div className="POIList">
                {POI.map((POI)=>{
                    return(
                        <div key={(Math.random()*100)}>{POI.value} -- {POI.caption}</div>
                    )
                })}
            </div>
        </div>
    )
}