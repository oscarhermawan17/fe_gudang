import { useState } from "react"

const useToggle = (defaultValue: boolean = false) => {
  const [isOpen, setIsOpen] = useState(defaultValue)

  const toggle = () => setIsOpen((prev) => !prev)

  const openToggle = () => setIsOpen(true)

  const closeToggle = () => setIsOpen(false)


  return {
    isOpen,
    toggle,
    openToggle,
    closeToggle
  }

}

export default useToggle