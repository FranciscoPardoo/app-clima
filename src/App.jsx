import { useState } from 'react'
import './App.css'

function App() {

    const [ciudad, setCiudad] = useState("")
    const [dataClima, setDataClima] = useState(null)

    const urlBase = "https://api.openweathermap.org/data/2.5/weather?"
    const apiKey = "d5e171666b8d9af824ecea1f9671c39f"
    const difKelvin = 273.15

    const handleCiudad = (e) => {
        setCiudad(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(ciudad.length > 0) fetchApi()
    }

    const fetchApi = async () => {
        try{
            const response = await fetch(`${urlBase}q=${ciudad}&appid=${apiKey}`)
            const data = await response.json()
            setDataClima(data)
        }catch(error){
            console.error("Ha ocurrido un problema:", error)
            }
    }


    return (
        <>
        <h1>Clima</h1>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder='Ciudad'
                value={ciudad}
                onChange={handleCiudad}
            />
            <button type="submit">🔎</button>
        </form>
        {dataClima && (
            <div>
                    <h2>{dataClima.name}</h2>
                    <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}ºC</p>
                    <p>Condición meteorológica: {dataClima.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
            </div>
        )
        }
        </>
    )
}

export default App
