import React from 'react'
import Char from './CharComponent/CharComponent'

const charList = (props) => props.inputArray.map((char, index) => {
        return (
          <Char 
            click={() => props.clicked(index)} 
            char={char.char} 
            index={index}
            key={char.id} />
        );
    }
);

export default charList;