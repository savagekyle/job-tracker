import React from 'react'
import "./AuthHeading.css"

const AuthHeading = (props) => {
  return (
    <div className='authHeading'>
        <h1>{props.h1}</h1>
        <p>{props.subText} <a href={props.url}>{props.urlName}</a></p>
    </div>
  )
}

export default AuthHeading