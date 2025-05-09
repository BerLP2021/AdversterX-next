import React from 'react'
import ThemeToggle from './theme-toggle'

function Header() {
  return (
    <header className="container flex justify-end py-2">
      <ThemeToggle className="cursor-pointer" />
    </header>
  )
}

export default Header
