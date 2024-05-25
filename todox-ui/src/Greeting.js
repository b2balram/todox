import React, { useState, useEffect } from 'react';

function Greeting() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000')
            .then((response) => response.text())
            .then((data) => setMessage(data));
    }, []);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
}

export default Greeting;
