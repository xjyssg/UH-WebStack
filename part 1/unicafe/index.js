import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({text}) => (
  <div>
    <h1>{text}</h1>
  </div>
)

const Button = ({handler, text}) => (
  <button onClick={handler}>
      {text}
  </button>
)


const Table = ({goodPart, neutralPart, badPart}) => {
  // let average = 
  return (
    <table>
      <tbody>
        <tr>
          <td>{goodPart.name}</td>
          <td>{goodPart.number}</td>
        </tr>
        <tr>
          <td>{neutralPart.name}</td>
          <td>{neutralPart.number}</td>
        </tr>
        <tr>
          <td>{badPart.name}</td>
          <td>{badPart.number}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{goodPart.number + neutralPart.number + badPart.number}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{String((goodPart.number - badPart.number) / (goodPart.number + neutralPart.number + badPart.number))}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{String((goodPart.number) / (goodPart.number + neutralPart.number + badPart.number) * 100)}%</td>
        </tr>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodPart = {
    name: "good",
    number: good
  }
  const neutralPart = {
    name: "neutral",
    number: neutral
  }
  const badPart = {
    name: "bad",
    number: bad
  }


  return (
    <div>
      <Title text="give feedback" />
      <Button handler={() => setGood(good+1)} text="good" />
      <Button handler={() => setNeutral(neutral+1)} text="neutral" />
      <Button handler={() => setBad(bad+1)} text="bad" />
      <Title text="statistics" />
      <Table goodPart={goodPart} neutralPart={neutralPart} badPart={badPart} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)