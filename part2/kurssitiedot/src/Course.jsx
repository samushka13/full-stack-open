const Header = ({ course }) => {
  return <h2>{course}</h2>
}

const Part = ({ part, exercises }) => {
  return <p>{part} {exercises}</p>
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((p) => <Part key={p.id} part={p.name} exercises={p.exercises} />)}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.map((p) => p.exercises).reduce((a, b) => a + b, 0)

  return <b>Total number of exercises {total}</b>
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course
