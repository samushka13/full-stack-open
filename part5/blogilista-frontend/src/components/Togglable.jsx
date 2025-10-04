import { useState } from 'react'

const Togglable = ({ labelWhenVisible, labelWhenNotVisible, children }) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  if (isVisible) {
    return <>
      {children}
      <button onClick={toggleVisibility}>{labelWhenNotVisible ?? 'Cancel'}</button>
    </>
  }

  return (
    <button onClick={toggleVisibility}>{labelWhenVisible}</button>
  )
}

export default Togglable
