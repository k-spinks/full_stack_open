import { useState } from 'react'

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState({
    0:0,
    1:0,
    2:0,
    3:0,
    4:0,
    5:0,
    6:0,
    7:0
  })

  const [selected, setSelected] = useState(0)
  const [highestAnecdote, setHighestAnecdote] = useState(0)

  const handleClick = () => {
    let randomNum = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNum)
  }

  const handleUpVote = () => {
    setVotes(prevVotes => {
      const updatedVotes = {
        ...prevVotes,
        [selected]: prevVotes[selected] + 1
      }

      const newHighestAnecdote = Object.keys(updatedVotes).reduce((a,b) => updatedVotes[a] > updatedVotes[b] ? a : b)
      setHighestAnecdote(newHighestAnecdote)

      return updatedVotes
    })

  }

  return (
    <div>
      <h1>{anecdotes[selected]} has <span>{votes[selected]} likes</span></h1>
      <button onClick={() => handleClick()}>Next Anecdote</button>
      <button onClick={() => handleUpVote()}>Like</button>

      <div>
        <h2>Anecdote with the most likes</h2>
        <h1>{anecdotes[highestAnecdote]} has <span>{votes[highestAnecdote]} likes</span></h1>
      </div>
    </div>
  )
}

export default App