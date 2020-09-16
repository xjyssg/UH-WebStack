import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import RecordForm from './components/RecordForm'
import Notification from './components/Notification'
import Record from './components/Record'
import webService from './services/web'

const App = () => {
  const [ records, setRecords ] = useState([])

  const [ newName, setNewName ] = useState('')
  
  const [ newNumber, setNewNumber ] = useState('')

  const [ newFilter, setNewFilter ] = useState('')

  const [showAll, setShowAll] = useState(true)

  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    webService
      .getAll()
      .then(initialRecords => {
        setRecords(initialRecords)
      })
  }, [])

  const addRecord = (event) => {
    event.preventDefault()

    var createFlag = true
    var updateFlag = false

    records.forEach(function(record, index, array) {
      if (record.name === newName) {
        createFlag = false
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          updateFlag = true
          createFlag = false
          const oldObject = records.find(record => record.name === newName)
          const newObject = {...oldObject, number: newNumber}
          webService
            .update(oldObject.id, newObject)
            .then(response => {
              setRecords(records.map(record => record.name === newName ? response : record))
              setMessage(
                `Added ${newName}`
              )
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })
            .catch(error => {
              setRecords(records.filter(record => record.name !== newName))
              setErrorMessage(
                `Information of ${newName} has already been removed from server`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
          
        }
      }
    })
    if (createFlag) {
      const newObject = {
        name: newName,
        number: newNumber
      }
      webService
        .create(newObject)
        .then(newRecord =>{
          setRecords(records.concat(newRecord))
          setMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
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

  const deleteHandler = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      webService
        .deleteRecord(person.id)
      console.log("alertttttt")
      setRecords(records.filter(record => record.id !== person.id))
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color='green' />
      <Notification message={errorMessage} color='red' />
      <Filter value={newFilter} handler={handleFilterChange} />
      <h3>add a new</h3>
      <RecordForm addRecord={addRecord} nameValue={newName} nameHandler={handleNameChange} numberValue={newNumber} numberHandler={handleNumberChange} />
      <h3>Numbers</h3>
      <div>
        {recordsToShow.map((record, idx) => <Record key={idx} record={record} deleteHandler={() => deleteHandler(record)} />)}
      </div>
    </div>
  )
}

export default App