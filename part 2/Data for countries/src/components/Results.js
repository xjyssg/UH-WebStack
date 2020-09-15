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
  console.log(finalResults.length)
  return (
    <div>
      {finalResults.map(result => <Details key={result.name} country={result} />)}
    </div>
  )
}

const Results = ({filter, records}) => {

  const [ show, setShow ] = useState([])
  

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
        <Details country={tmpResults[0]} />
      )
    } else {
        return 'Nothing found'
    }
  }
    
}

export default Results


