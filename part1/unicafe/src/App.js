import { useState } from 'react'

const Heading = ({sentence}) => (
  <h1>{sentence}</h1>
)

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StaticLine = ({text,value}) => (
  <tr>
      <td>{text}</td>
      <td>{value}</td>
  </tr>
)

const Percentage = ({good,bad,neutral}) => {
  //const text = props.text
  const all = good+bad+neutral
  const averageGood = (good)/all
  const score = good-bad

  if (all == 0) return <p>No feedback given</p>
  else{
    return(
      <table>
        <tbody>
          <StaticLine text="good" value={good} />
          <StaticLine text="neutral" value={neutral} />
          <StaticLine text="bad" value={bad} />
          <StaticLine text="all" value={all} />
          <StaticLine text="average" value={score/all} />
          <StaticLine text="positive" value={averageGood*100} />
        </tbody>
      </table>
    )
  }
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <Heading sentence="give feedback"/>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>
      <Heading sentence="statistics"/>
      <Percentage good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
