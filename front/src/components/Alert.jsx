import React from 'react'
import './alert.css';

const Alert = ({ msg }) => {
  return (
    <div className="errorContainer">
      <p className="error">{msg}</p>
    </div>
  )
}

export default Alert