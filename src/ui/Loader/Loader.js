import React from 'react';
import './Loader.css';

export default function Loader(props) {
    return (
        <div className={[props.className, "lds-default"].join(' ')}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}
