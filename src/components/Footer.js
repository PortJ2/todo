import React from 'react'

const Footer = ({ count }) => {
  return (
    <footer>
      <p>There are {count} {count === 1 ? "item" : "items"}</p>
    </footer>
  )
}

export default Footer