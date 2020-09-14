import React, { useState } from 'react'

const App = () => {
  const [ records, setPersons ] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  
  const [ newNumber, setNewNumber ] = useState('')

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

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
        {records.map(record => <li key={record.name}>{record.name} {record.number}</li>)}
      </ul>
    </div>
  )
}

export default App