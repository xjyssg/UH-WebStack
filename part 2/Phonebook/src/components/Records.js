import React from 'react'


const Records = ({recordsToShow}) => (
  <ul>
  {recordsToShow.map(record => <li key={record.name}>{record.name} {record.number}</li>)}
</ul>
)


export default Records