import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import RecordForm from './components/RecordForm'
import Records from './components/Records'

const App = () => {
  const [ records, setRecords ] = useState([])

  const [ newName, setNewName ] = useState('')
  
  const [ newNumber, setNewNumber ] = useState('')

  const [ newFilter, setNewFilter ] = useState('')

  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setRecords(response.data)
      })
  }, [])

  const addRecord = (event) => {
    event.preventDefault()

    var createFlag = true

    records.forEach(function(record, index, array) {
      if (record.name === newName) {
        window.alert(`${newName} is already added to phonebook`)
        createFlag = false
      }
    })

    if (createFlag) {
      const newObject = {
        name: newName,
        number: newNumber
      }
      setRecords(records.concat(newObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const recordsToShow = showAll
    ? records
    : records.filter(record => record.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    if ((newFilter === '' && event.target.value !== '') || (event.target.value === '' && newFilter !== '')) {
      setShowAll(!showAll)
    }
    setNewFilter(event.target.value)
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} handler={handleFilterChange} />
      <h3>add a new</h3>
      <RecordForm addRecord={addRecord} nameValue={newName} nameHandler={handleNameChange} numberValue={newNumber} numberHandler={handleNumberChange} />
      <h3>Numbers</h3>
      <Records recordsToShow={recordsToShow} />
    </div>
  )
}

export default App