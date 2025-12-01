import Part from "./Part"
const Content = ({content}) => {
  return (
    <div>
      {content.map((part) => (
      <Part key={part.id} name={part.name} exercises={part.exercises}/>
    ))}
    <h4>Total of {content.reduce((sum, current) => sum + current.exercises, 0)} exercises</h4>
    </div>
)
}

export default Content