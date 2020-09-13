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

const Element = ({name, number}) => (
  <p>{name} {number}</p>
)

const Statistics = ({goodPart, neutralPart, badPart}) => {
  if (goodPart.number + neutralPart.number + badPart.number != 0) {
    return (
    <div>
      <p>{goodPart.name} {goodPart.number}</p>
      <p>{neutralPart.name} {neutralPart.number}</p>
      <p>{badPart.name} {badPart.number}</p>
      <p>all {goodPart.number + neutralPart.number + badPart.number} </p>
      <p>average {(goodPart.number - badPart.number) / (goodPart.number + neutralPart.number + badPart.number)} </p>
      <p>positive {(goodPart.number) / (goodPart.number + neutralPart.number + badPart.number) * 100} % </p>
    </div>
    )
  } else {
    return (
      <p>No feedback given</p>
    )
  }
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
      <Statistics goodPart={goodPart} neutralPart={neutralPart} badPart={badPart} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)