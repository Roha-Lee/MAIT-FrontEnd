import Clock from 'react-live-clock'
import React  from 'react';

function MyComponent () {
    return (
        <Clock format={'HH:mm:ss'} interval={6000} timezone={'ko'} />
    );
}

export default Today;