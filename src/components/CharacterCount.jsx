import { useState, useEffect } from 'react'

const CharacterCount = () => {
  const [userInput, setUserInput] = useState('')
  const [countBreakdown, setCountBreakdown] = useState(null)
  const [countBreakdownCI, setCountBreakdownCI] = useState(null)

  const handleTextChange = (e) => {
    const textFieldValue = e.target.value
    setUserInput(textFieldValue)
  }

  const displayCounts = (newObject) => {
    // const stringified = JSON.stringify(newObject, null, 2)
    if (newObject) {
      const newArr = Object.entries(newObject)
      console.log('newArr', newArr)
      return newArr
    }

  }

  const alphabetize = (newObject) => {
    if (newObject) {      
      let sortedObject = {}
      Object.keys(newObject).sort((a, b) => {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      }).forEach(function(key) {
        sortedObject[key] = newObject[key];
      })
      return sortedObject
    } else {
      return null
    }
  }

  const makeObject = (newString) => {
    let result = {} 
    for (let i = 0; i< newString.length; i++) { 
      let ch = newString.charAt(i) 
      if(!result[ch]) { 
        result[ch] =1 
      } else { 
        result[ch]+=1
      } 
    }
    return result
  }

  const DisplayCountTable = ({countArr}) => {
    if (countArr) {
    return (
      <table className="count-result-table">
        <tr>
          <th>Character</th>
          <th>Count</th>
        </tr>
      {
        countArr.map(pair => 
          <tr key={pair}>
            {pair.map(item => <td key={item}>{item}</td>)}
          </tr>)
      }</table>
      )
    }
  }

  useEffect(() => {
    const str = userInput
    const strCaseInsensitive = userInput.toLowerCase()
    setCountBreakdown(makeObject(str))
    setCountBreakdownCI(makeObject(strCaseInsensitive))
  }, [userInput])

  return (
    <div id="page-character-count">
      <h2>Character Count</h2>
      <p>Enter your text.</p>      

      <form>
        <label>
          <textarea value={userInput} onChange={handleTextChange} rows="15" cols="70"/>
        </label>
      </form>

      <h2>Results</h2>
      
      <div id="count-output">
          
        <p><strong>Case Sensitive</strong></p>
        <DisplayCountTable countArr={displayCounts(alphabetize(countBreakdown))} /> 

        <p><strong>Case Insensitive</strong></p>
        <DisplayCountTable countArr={displayCounts(alphabetize(countBreakdownCI))} /> 
      </div>
    </div>
  )
}

export default CharacterCount