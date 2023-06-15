import React, {useRef} from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';
import '../CSS/searchBar.css'
/*
This component needs to be wrapped in a Loadscript with libraries = ["places"] when used
*/

export default function SearchBar({setLat, setLon, setLocationName}){
    const inputRef = useRef()

    const handlePlaceChanged = () => {
        try{
        const [place] = inputRef.current.getPlaces()
        if (place){
            setLat(place.geometry.location.lat())
            setLon(place.geometry.location.lng())
            place.name ? setLocationName(place.name) : setLocationName(null)
        }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className='search-bar-container'>
            <div className='search-bar'>
            <StandaloneSearchBox 
                onLoad={ref => (inputRef.current = ref)}
                onPlacesChanged={handlePlaceChanged}
            >
                <input
                    type='text'
                    className='form-control'
                    placeholder='Enter Location'
                />
            </StandaloneSearchBox>
            </div>
        </div>
    )
}