import React from 'react'

// main React file. 

export default function Main(props) {
    const { children } = props

    return (
        <main>
            {children}
        </main>
  )
}
