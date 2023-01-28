import React from 'react'

function TextError(props) {
    return (
        <div className='errors'>
            {props.children}
        </div>
    )
}

export default TextError
