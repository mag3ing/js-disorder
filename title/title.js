import React from 'react';
require('./title.css');

export default function Title(props){
    return (
        <span className='merchant-title'>
            {props.children}
        </span>
    )
}
