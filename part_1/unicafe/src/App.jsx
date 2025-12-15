import { useState } from 'react'

const Button = ({name, onClick}) => <button onClick={onClick}>{name}</button>

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
)
}

const Statistics = ({good, neutral, bad, total}) => {
  return (
    <div>
      {total === 0 ? "No feedback given"
      : (
        <table>
          <tbody>
            <StatisticLine text={"Good"} value={good} />
            <StatisticLine text={"Neutral"} value={neutral} />
            <StatisticLine text={"Bad"} value={bad} />
            <tr>
              <td>All Feedback</td>
              <td>{total}</td>
            </tr>
            <tr>
              <td>Average</td>
              <td>{(good - bad) / total}</td>
            </tr>
            <tr>
              <td>Positive</td>
              <td>{`${((good / total) * 100).toFixed(2)}%`}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const giveFeedBack = feedback => {
    switch (feedback) {
      case "good":
        setGood((prev) => prev + 1)
        setTotal((prev) => prev + 1)
        break;
      case "neutral":
        setNeutral((prev) => prev + 1)
        setTotal((prev) => prev + 1)
        break;
      case "bad":
        setBad((prev) => prev + 1)
        setTotal((prev) => prev + 1)
        break;
      default:
        console.log('No Feedback')
        break;
    }
  }


  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => giveFeedBack("good")} name={"Good"}/>
      <Button onClick={() => giveFeedBack("neutral")} name={"Neutral"}/>
      <Button onClick={() => giveFeedBack("bad")} name={"Bad"}/>
      <h2>Statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} total={total} />
    </div>
  )
}

export default App