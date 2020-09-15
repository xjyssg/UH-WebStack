import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Results from './components/Results'


const App = () => {
  const [ records, setRecords ] = useState([])

  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setRecords(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <p>filter shown with <input value={filter} onChange={handleFilterChange} /></p>
      <Results filter={filter} records={records} />
    </div>
  )
}

export default App