import React from 'react'
import { Link } from "react-router-dom"
import { withRouter } from 'react-router';

const Header = () => {
  const test = 0;
  return (
    <div className="App-header">
      <h1>UNJ app</h1>
      <ul>
        <li>
          <Link to={`/`}>Home</Link>
        </li>
        <li>
          <Link to={`/template`}>Template App</Link>
          </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
