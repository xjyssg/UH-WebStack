import React from 'react'


const Header = ({text}) => (
  <h2>{text}</h2>
)

const Part = ({text, number}) => (
  <p>{text} {number}</p>
)

const Total = ({parts}) => {
  const numberList = parts.map(part => part.exercises)
  return (
    <h3>total of {numberList.reduce((x, y) => x+y)} exercises</h3>
  )
}

const Content = ({parts}) => {
    
  return (
    <div>
      {parts.map(part => <Part key={part.id} text={part.name} number={part.exercises} />)}
      <Total parts={parts} />
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course