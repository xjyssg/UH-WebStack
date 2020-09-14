import React from 'react'


const Header = ({text}) => (
  <h1>{text}</h1>
)

const Part = ({text, number}) => (
  <p>{text} {number}</p>
)

const Content = ({parts}) => {
    
  return (
    <div>
      {parts.map(part => <Part key={part.id} text={part.name} number={part.exercises} />)}
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