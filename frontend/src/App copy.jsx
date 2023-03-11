import { useState, useEffect } from 'react'
import './App.css'
import Axios from 'axios'

function App() {

  var [location, setLocation] = useState("");

  useEffect(()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=> {
        var latitude = position.coords.latitude
        var longitude = position.coords.longitude

        Axios.post('http://localhost:5000/getPlaces',{"longitude": longitude, "latitude": latitude})
        .then(response => {
          setLocation(response.data)
          return response.data;
        })
        .catch(err => {
          return err.message;
        })

      });

  
    }


  }, [])
  
  
  return (
    <div className="App"> 
      <h1> LOCATION: {location}</h1>
    </div>
  )
}

export default App
