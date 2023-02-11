import React from "react";
import Typewritter from 'typewriter-effect'

const Jumbotron =({text})=> {
    return(<Typewritter 
        options = { {
            strings: text,
            autoStart: true,
            loop: true
        }}
        />)
}

export default Jumbotron;