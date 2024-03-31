import { useState, useEffect } from 'react'

const CharacterCount = () => {
  const [userInput, setUserInput] = useState('')
  const [countBreakdown, setCountBreakdown] = useState(null)
  const [countBreakdownCI, setCountBreakdownCI] = useState(null)
  const [sortToggle, setSortToggle] = useState('CHAR')
  const [sortToggleCI, setSortToggleCI] = useState('CHAR')

  const handleTextChange = (e) => {
    const textFieldValue = e.target.value
    setUserInput(textFieldValue)
  }

  const displayCounts = (newObject) => {
    // const stringified = JSON.stringify(newObject, null, 2)
    if (newObject) {
      const newArr = Object.entries(newObject)
      // console.log('newArr', newArr)
      return newArr
    }

  }

  const sortByKey = (newObject) => {
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

  const sortByValue = (newObject) => {
    if (newObject) {      
      let sortedObject = {}
      Object.keys(newObject).sort((a, b) => {
        return newObject[b] - newObject[a]
      }).forEach(function(key) {
        sortedObject[key] = newObject[key]
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

  const handleSortChar = () => {
    setSortToggle('CHAR')
  }

  const handleSortVAL = () => {
    setSortToggle('VAL')
  }

  const handleSortCharCI = () => {
    setSortToggleCI('CHAR')
  }

  const handleSortVALCI = () => {
    setSortToggleCI('VAL')
  }

  const DisplayCountTable = ({countArr}) => {
    if (countArr) {
    return (
      <table className="count-result-table">
        <thead>
        <tr>
          <th><span onClick={handleSortChar}>Character</span></th>
          <th><span onClick={handleSortVAL}>Count</span></th>
        </tr>
        </thead>
        <tbody>
      {
        countArr.map(pair => 
          <tr key={pair}>
            {pair.map(item => <td key={item}>{item}</td>)}
          </tr>)
      }</tbody></table>
      )
    }
  }

  const DisplayCountTableCI = ({countArr}) => {
    if (countArr) {
    return (
      <table className="count-result-table">
        <thead>
        <tr>
          <th><span onClick={handleSortCharCI}>Character</span></th>
          <th><span onClick={handleSortVALCI}>Count</span></th>
        </tr>
        </thead>
        <tbody>
      {
        countArr.map(pair => 
          <tr key={pair}>
            {pair.map(item => <td key={item}>{item}</td>)}
          </tr>)
      }</tbody></table>
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

      { userInput 
        ?
        <div>

          <h2>Results</h2>
          
          <div id="count-output">
              
            <p><strong>Case Sensitive</strong></p>
            { sortToggle === 'CHAR'
              ? <DisplayCountTable countArr={displayCounts(sortByKey(countBreakdown))} /> 
              : <DisplayCountTable countArr={displayCounts(sortByValue(countBreakdown))} />
            }

            <p><strong>Case Insensitive</strong></p>
            { sortToggleCI === 'CHAR'
              ? <DisplayCountTableCI countArr={displayCounts(sortByKey(countBreakdownCI))} /> 
              : <DisplayCountTableCI countArr={displayCounts(sortByValue(countBreakdownCI))} />
            }
          </div>
        </div>
        : null 
      }

    </div>
  )
}

export default CharacterCount