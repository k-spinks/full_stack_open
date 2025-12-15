const Filter = ({handleSearchSubmit, searchTerm, handleSearchTermChange}) => {
  return (
    <form onSubmit={handleSearchSubmit}>
      <label>Filter </label>
      <input value={searchTerm} onChange={handleSearchTermChange}/>
    </form>
  )
}

export default Filter