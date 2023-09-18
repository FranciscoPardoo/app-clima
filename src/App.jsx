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
        <div className='flex-col w-96 h-96 flex justify-center'>
            <h1 className="my-8 text-5xl font-bold text-center text-white">Clima</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    className='w-72 rounded'
                    type="text" 
                    placeholder='Ciudad'
                    value={ciudad}
                    onChange={handleCiudad}
                />
                <button className='w-1/6 ml-2 bg-gray-300 rounded hover:bg-blue-500' type="submit">🔎</button>
            </form>
            {dataClima && (
                <div className='bg-blue-400 flex justify-center flex-col shadow-md shadow-gray-400 w-72 h-96 font-semibold my-6 p-4 rounded text-white'>
                        <h2>{dataClima.name}</h2>
                        <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}ºC</p>
                        <p>Condición meteorológica: {dataClima.weather[0].description}</p>
                        <img className='px-20' src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
                </div>
            )
            }
        </div>
    )
}

export default App
