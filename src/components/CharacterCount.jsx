import { useState, useEffect } from 'react'

const CharacterCount = () => {
  const [userInput, setUserInput] = useState('')
  const [countBreakdown, setCountBreakdown] = useState(null)

  const handleTextChange = (e) => {
    const textFieldValue = e.target.value
    setUserInput(textFieldValue)
  }

  const displayCounts = (countObject) => {
    return JSON.stringify(countObject, null, 2)
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
    console.log("The occurrence of each letter in given string is:",result)
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
        <pre className="results">{displayCounts(countBreakdown)}</pre>
      </div>
    </div>
  )
}

export default CharacterCount