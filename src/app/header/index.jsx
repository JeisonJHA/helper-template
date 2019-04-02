import React from 'react'
import { Link } from "react-router-dom"

function Header({ match }) {
  return (
    <div className="App-header">
      <h1>Helper template</h1>
      <ul>
        <li>
          <Link to={`/template`}>Template App</Link>
          {/* <Link to={`${match.url}/main`}>Home</Link> */}
        </li>
      </ul>
    </div>
  )
}

export default Header
