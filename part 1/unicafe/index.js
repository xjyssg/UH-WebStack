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

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title text="give feedback" />
      <Button handler={() => setGood(good+1)} text="good" />
      <Button handler={() => setNeutral(neutral+1)} text="neutral" />
      <Button handler={() => setBad(bad+1)} text="bad" />
      <Title text="statistics" />
      <Element name="good" number={good} />
      <Element name="neutral" number={neutral} />
      <Element name="bad" number={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)