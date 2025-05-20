export const outClick = (fx = () => { }, ref) => {

  const handleOutClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      fx()
    }
  }
  // Bind the event listener
  document.addEventListener('mousedown', handleOutClick)

  return () => {
    // Unbind the event listener on cleanup
    document.removeEventListener('mousedown', handleOutClick)
  }
}


export const getTag = (id) => document.getElementById(id)