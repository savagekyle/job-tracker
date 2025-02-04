import React from 'react'
import "./ImageLG.css"

const ImageLG = (props) => {
  return (
    <div className='imgWrapper'>
        <img className='authImg' src={props.src} alt={props.alt} />
    </div>
  )
}

export default ImageLG