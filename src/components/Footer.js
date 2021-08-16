import React from 'react';
import {Link} from 'react-router-dom';

export default function Footer() {
    return (
        <div className="footer">
            <div className="top-content">
                <div>My Reads</div>
                <div>  
                    <Link to="/search">Search</Link>
                    <Link to="/">Home</Link>
                </div>
            </div>
            <div className="bottom-content">
                <p>All Rights are Reserved &copy; {new Date().getFullYear()}</p>
                <p>Made by <a href="https://github.com/Mohamed-Elhawary" target="_blank">Hawary</a></p>
            </div>
        </div>
    )
}
