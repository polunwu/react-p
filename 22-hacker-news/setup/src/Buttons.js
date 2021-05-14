import React from 'react'
import { useGlobalContext } from './context'

const Buttons = () => {
  const { isLoading, page, nbPages, handlePage } = useGlobalContext()
  return (
    <div className="btn-container">
      <button onClick={() => handlePage('dec')} disabled={isLoading}>
        PREV
      </button>
      <p>
        {page + 1} / {nbPages}
      </p>
      <button onClick={() => handlePage('inc')} disabled={isLoading}>
        NEXT
      </button>
    </div>
  )
}

export default Buttons
