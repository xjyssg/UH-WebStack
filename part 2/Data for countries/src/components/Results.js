import React, { useState, useEffect } from 'react'
import axios from 'axios'



const Details = ({country}) => (
  <div>
    <h2>{country.name}</h2>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h3>languages</h3>
    <ul>
      {country.languages.map(language =><li key={language.iso639_2}>{language.name}</li>)}
    </ul>
    <img src={country.flag} width="100"></img>
  </div>

)

const ShowMore = ({show, tmpResults}) => {
  let finalResults = tmpResults.filter(record => show.indexOf(record.name) !== -1)
  return (
    <div>
      {finalResults.map(result => <Details key={result.name} country={result} />)}
    </div>
  )
}

const WeatherDetails = ({info}) => {
  console.log("@@@", info)
  if (JSON.stringify(info) === '{}') {
    return <p></p>
  } else {
    return (
      <div>
      <h2>Weather in {info.location.name}</h2>
      <div>temperature: {info.current.temperature} Celsius</div>
      <img src={info.current.weather_icons[0]} width="100"></img>
      <div>wind: {info.current.wind_speed}mph direction {info.current.wind_dir}</div>
      </div>
    )
  }
}

const Weather = ({name}) => {
  const [ info, setInfo ] = useState({})

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${name}`)
      .then(response => {
        console.log(response.data)
        setInfo(response.data)
      })
  }, [])
  
  return <WeatherDetails info={info} />


}

const Results = ({filter, records}) => {

  const [ show, setShow ] = useState([])
  const [ weather, setWeather ] = useState([])
  

  const handlerShow = (name) => {
    const handler = () => {
      setShow(show.concat(name))
    }
    return handler
  }

  if (filter === '') {
    return 'Input something'
  } else {
    let tmpResults = records.filter(record => record.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    if (tmpResults.length > 10) {
      return 'Too many matches, specify another filter'
    } else if (tmpResults.length > 1) {
      return (
          <div>
            <div>
              {tmpResults.map(result =>
                <div key={result.alpha3Code}>
                  {result.name}
                  <button onClick={handlerShow(result.name)}>
                    show
                  </button>
                </div>)}
            </div>
            <ShowMore show={show} tmpResults={tmpResults} />
          </div>
      )
    } else if (tmpResults.length === 1){
      return (
        <div>
          <Details country={tmpResults[0]} />
          <Weather name={tmpResults[0].name} />
        </div>
      )
    } else {
        return 'Nothing found'
    }
  }
    
}

export default Results


