import React, { useState, useEffect } from 'react'
import rgbToHex from './utils'

const SingleColor = ({rgb, weight, index, hexColor}) => {
  const [alert, setAlert] = useState(false)

  const bgc = rgb.join(',')
  const hexValue = `#${hexColor}`
  const classValue = `color ${index >= 20 && 'color-light'}`

  useEffect(() => {
    let timeOut = setTimeout(() => {
      setAlert(false)
    }, 3000);
    return () => clearTimeout(timeOut)
  }, [alert])
  
  return (
    <article className={classValue} 
      style={{backgroundColor: `rgb(${bgc})`}}
      onClick={() => {
        setAlert(true)
        navigator.clipboard.writeText(hexValue)
      }}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color-value">{hexValue}</p>
      {alert && <p className="alert">copied to clipboard</p>}
    </article>
  )
}

export default SingleColor
