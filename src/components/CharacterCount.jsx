import { useState, useEffect } from 'react'

const CharacterCount = () => {
  const [userInput, setUserInput] = useState('')
  const [countBreakdown, setCountBreakdown] = useState(null)

  const handleTextChange = (e) => {
    const textFieldValue = e.target.value
    setUserInput(textFieldValue)
  }

  const displayCounts = (newObject) => {
    return JSON.stringify(newObject, null, 2)
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

  const alphabetizeCaseSensitive = (newObject) => {

    if (newObject) {
      let sortedObject = {}

      Object.keys(newObject)
        .sort((a, b) => {
          
          return a.localeCompare(b)
        })
        .forEach((key) => {
          sortedObject[key] = newObject[key]
        })
      return sortedObject
    } else {
      return null
    }
  }

  useEffect(() => {
    const str = userInput
    let result = {} 
    for (let i = 0; i< str.length; i++) { 
      let ch = str.charAt(i) 
      if(!result[ch]) { 
        result[ch] =1 
      } else { 
        result[ch]+=1
      } 
    }
    setCountBreakdown(result)
  }, [userInput])

  return (
    <div id="page-character-count">
      <h2>Character Count</h2>
      <p>Enter your text.</p>
      

      <form>
        <label>
          <textarea value={userInput} onChange={handleTextChange} />
        </label>
      </form>
      
      <div id="count-output">
      <h2>Case Insensitive</h2>
        <pre className="results">{displayCounts(alphabetize(countBreakdown))}</pre>
      </div>
    </div>
  )
}

export default CharacterCount