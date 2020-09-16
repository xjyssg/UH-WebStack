import React from 'react'


const Record = ({record, deleteHandler}) => {
  return (
    <div>
      {record.name} {record.number}
      <button onClick={deleteHandler}>delete</button>
    </div>
  )
}


export default Record