import React, { useCallback, useContext, useEffect } from 'react'

import { AppContext } from '../App'
import Key from './Key'

type Props = {}

function Keyboard({}: Props) {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"]
  const keys = [...keys1, ...keys2, ...keys3]

  // @ts-ignore
  const { onDelete, onEnter, onSelectLetter } = useContext(AppContext)

  const handleKeyboard = useCallback((event: KeyboardEvent) => {
    switch(event.key) {
      case "Enter":
        return onEnter();
      case "Backspace":
        return onDelete();
      default:
        keys.forEach((key) => {
          if (key === event.key.toUpperCase()) {
            return onSelectLetter(key)
          }
        })
    }
  }, [onDelete, onEnter, onSelectLetter])
  

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    }
  })

  return (
    <div className="keyboard">
      <div className="line1">{keys1.map((key) => {
        return <Key keyVal={key}/>
      })}</div>
      <div className="line2">{keys2.map((key) => {
        return <Key keyVal={key}/>
      })}</div>
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey/>
        {keys3.map((key) => {
          return <Key keyVal={key}/>
        })}
        <Key keyVal={"DELETE"} bigKey/>
      </div>
    </div>
  )
}

export default Keyboard