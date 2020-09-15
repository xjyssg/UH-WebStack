import React from 'react'


const Results = ({filter, records}) => {
    if (filter === '') {
      return 'Input something'
    } else {
      let tmpResults = records.filter(record => record.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
      if (tmpResults.length > 10) {
        return 'Too many matches, specify another filter'
      } else if (tmpResults.length > 1) {
        return (
            <div>
                {tmpResults.map(result =><div key={result.alpha3Code}>{result.name}</div>)}
            </div>
        )
      } else if (tmpResults.length === 1){
        return (
            <div>
                <h2>{tmpResults[0].name}</h2>
                <div>capital {tmpResults[0].capital}</div>
                <div>population {tmpResults[0].population}</div>
                <h3>languages</h3>
                <ul>
                    {tmpResults[0].languages.map(language =><li key={language.iso639_2}>{language.name}</li>)}
                </ul>
                <img src={tmpResults[0].flag} width="100"></img>
            </div>
        )
      } else {
          return 'Nothing found'
      }
    }
    
}

export default Results


