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
import axios from "axios";
import POIAdder from "./POIAdder"
import "./styles/dashboard.css"


export default ({setLocation, user})=>{
    const {
        ready, 
        value, 
        setValue, 
        suggestions: {status, data}, 
        clearSuggestions} =
        usePlacesAutoComplete();

    const handleSelect = async (val) => {
        setValue(val, false);
        clearSuggestions();
    }

    const handleSubmit = async (e)=> {
        e.preventDefault();

        if (!value){
            setErrorMessage("A field hasn't been filled out!")
            return;
        }

        const results = await getGeocode({address: value});
        const {lat, lng} = await getLatLng(results[0]);
        setLocation({lat, lng}, value, startDate, endDate, caption, user, POI)

        if (file){
            const extention = file.name.split(".").pop();
            const newName = value.concat(".").concat(extention)

            const renamedFile = new File([file], newName, {type: file.type})
            const formData = new FormData();
            formData.append("file", renamedFile);
        

            try{
                const res = await axios.post("http://localhost:3001/upload",formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                const {fileName, filePath} = res.data
                setUploadedFile({fileName, filePath})
            }catch (err){
                if(err.response.status === 500) {
                    console.log("500 server error")
                }else{
                    console.log(err.response.data.msg)
                }
            }     
        }  
    }

    const handleKeyPress =(e)=>{
        if(e.key === "Enter"){
            e.preventDefault()
        }
    }

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("Choose File")
    const [uploadedFile, setUploadedFile] = useState({})
    const [caption, setCaption] = useState("")
    const [POI, setPOI] = useState([])
    const [errorMessage, setErrorMessage] = useState("")

    const handlePOIChange = (newPOI) =>{
        setPOI([...POI,newPOI])
    }

    return(
        <div className="inputForm">
            <div className="tripAdderTitle">Add A Trip</div>

            <form onSubmit={e=>handleSubmit(e)}>
                <Combobox onSelect={handleSelect}>
                    <ComboboxInput 
                    value={value} 
                    onChange={e=>setValue(e.target.value)} 
                    className="title-input"
                    placeholder="Enter Trip Location"
                    onKeyPress={handleKeyPress}
                    />
                    <ComboboxPopover>
                        <ComboboxList>
                            {status==="OK" && data.map(({place_id, description}) => <ComboboxOption key = {place_id} value ={description}/>)}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>
                <div className = "dateInput">
                    <div className="start-input">
                        Start Date: 
                        <input type="date" className="date-selector" onChange = {(e)=>
                            setStartDate(e.target.value)
                        }/>
                    </div>
                    <div className="end-input">
                        End Date:   
                        <input type="date" className="date-selector" onChange = {(e)=>
                        setEndDate(e.target.value)
                        }/>
                    </div>
                </div>
                <input type="text" placeholder="Write a Caption" className="caption-box" onKeyPress={handleKeyPress} onChange={(e)=>{
                    setCaption(e.target.value)
                }}></input>
                <Fragment>
                    Upload File
                        <input type="file" onChange={(e)=>{
                            setFileName(e.target.files[0].name)
                            setFile(e.target.files[0])
                        }}/>
                        <label htmlFor="customFile">
                            {fileName}
                        </label>
                </Fragment>

                <POIAdder handlePOIChange={handlePOIChange} POI={POI} handleKeyPress={handleKeyPress}/>
                <button type="submit" className="submit-button">Submit</button>
                {errorMessage}

            </form>
                
        </div>

    )
}