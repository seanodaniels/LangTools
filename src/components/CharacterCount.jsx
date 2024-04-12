import { useState, useEffect } from 'react'

const CharacterCount = () => {
  const [userInput, setUserInput] = useState('')
  const [countBreakdown, setCountBreakdown] = useState(null) // object
  const [countBreakdownCI, setCountBreakdownCI] = useState(null)

  const handleTextChange = (e) => {
    const textFieldValue = e.target.value
    setUserInput(textFieldValue)
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

  const LetterDataTable = ({tableData}) => {
    // console.log('tableSort', tableSort)
    const [ sortBy, setSortBy ] = useState('CHARACTER')
    const [ tableDataArr, setTableDataArr ] = useState(null)

    const sortTableByKey = (newObject) => {
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
  
    const sortTableByValue = (newObject) => {
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

    const objToArr = (newObject) => {
      // Convert an object into an array we can manipulate
      // const stringified = JSON.stringify(newObject, null, 2)
      if (newObject) {
        const newArr = Object.entries(newObject)
        // console.log('newArr', newArr)
        return newArr
      }    
    }

    const handleSortByKey = () => {
      setSortBy('CHARACTER')
    }

    const handleSortByVal = () => {
      setSortBy('COUNT')
    }

    useEffect(() => {
      console.log('sortBy', sortBy)
      sortBy === 'CHARACTER'
        ? setTableDataArr(objToArr(sortTableByKey(tableData)))
        : setTableDataArr(objToArr(sortTableByValue(tableData)))
    }, [sortBy])

    if (tableData && tableDataArr) {
      return (
        <table className="count-result-table">
          <thead>
          <tr>
            <th><span onClick={handleSortByKey}>Character</span></th>
            <th><span onClick={handleSortByVal}>Count</span></th>
          </tr>
          </thead>
          <tbody>
        {
          tableDataArr.map(pair => 
            <tr key={`l${pair[0]}`} className={pair}>
              <td>{pair[0]}</td>
              <td>{pair[1]}</td>
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
      

      <div className="user-input-area">
      <h2>Character Count</h2>
      <p>Enter your text.</p>      

      <form>
        <label>
          <textarea value={userInput} onChange={handleTextChange} rows="15" cols="70"/>
        </label>
      </form>

      </div>
      <div className="character-count-output">

        { userInput 
          ?
          <div>

            <h2>Results</h2>
            
            <div id="count-output">

              <div className="table-display case-sensitive-output">

                <p><strong>Case Sensitive</strong></p>
                <LetterDataTable tableData={countBreakdown} />

              </div>

              <div className="table-display case-insensitive-output">
                
                <p><strong>Case insensitive</strong></p>
                <LetterDataTable tableData={countBreakdownCI} />

              </div>
                
            </div>
          </div>
          : null 
        }
      </div>

    </div>
  )
}

export default CharacterCount