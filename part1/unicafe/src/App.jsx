import { useState } from 'react'

const StatisticLine = ({ title, value }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const avg = all ? (((good * 1) + (neutral * 0) + (bad * -1)) / all).toFixed(1) : "-"
  const positive = all ? ((good / all) * 100).toFixed(1) + " %" : "-"

  return (
    <>
      <h1>Statistics</h1>

      {all ?
        <table>
          <tbody>
            <StatisticLine title={"Good"} value={good} />
            <StatisticLine title={"Neutral"} value={neutral} />
            <StatisticLine title={"Bad"} value={bad} />

            <StatisticLine title={"All"} value={all} />
            <StatisticLine title={"AVG"} value={avg} />
            <StatisticLine title={"Positive"} value={positive} />
          </tbody>
        </table>
      :
        <p>No feedback given</p>
      }
    </>
  )
}

const Button = ({ title, onClick }) => {
  return <button onClick={onClick}>{title}</button>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      
      <Button title={"Good"} onClick={() => setGood((prev) => prev + 1)} />
      <Button title={"Neutral"} onClick={() => setNeutral((prev) => prev + 1)} />
      <Button title={"Bad"} onClick={() => setBad((prev) => prev + 1)} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
