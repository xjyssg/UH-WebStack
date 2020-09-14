import React from 'react'


const RecordForm = ({addRecord, nameValue, nameHandler, numberValue, numberHandler}) => (
  <form onSubmit={addRecord}>
    <div>
      name: <input value={nameValue} onChange={nameHandler} />
    </div>
    <div>
      number: <input value={numberValue} onChange={numberHandler} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)


export default RecordForm