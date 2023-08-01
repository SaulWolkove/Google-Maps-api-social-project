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
import axios from "axios"



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
        const results = await getGeocode({address: value});
        const {lat, lng} = await getLatLng(results[0]);
        setLocation({lat, lng}, value, startDate, endDate, caption, user)


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

    const [formOpen, setFormOpen] = useState(true)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")


    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("Choose File")
    const [uploadedFile, setUploadedFile] = useState({})
    const [caption, setCaption] = useState("")
    


        return(
            <div>
                <button onClick={()=>{
                    setFormOpen(!formOpen)
                }}>Add A Destination</button>

                {formOpen &&
                    <form onSubmit={e=>handleSubmit(e)}>
                    <Combobox onSelect={handleSelect}>
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
                    Start Date
                    <input type="date" onChange = {(e)=>
                        setStartDate(e.target.value)
                    }/>
                    End Date
                    <input type="date" onChange = {(e)=>
                        setEndDate(e.target.value)
                    }/>
                    Write a LoCaption
                    <input type="text" onChange={(e)=>{
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

                    <button type="submit" style={{"width":"90%","height":"20px","margin":"10px"}}>Submit</button>
                    </form>
                }       
            </div>

        )
}