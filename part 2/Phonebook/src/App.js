import React, { useState } from 'react'

const App = () => {
  const [ records, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  
  const [ newNumber, setNewNumber ] = useState('')

  const [ newFilter, setNewFilter ] = useState('')

  const [showAll, setShowAll] = useState(true)

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
      setPersons(records.concat(newObject))
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
      <div>
        filter shown with <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addRecord}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {recordsToShow.map(record => <li key={record.name}>{record.name} {record.number}</li>)}
      </ul>
    </div>
  )
}

export default App