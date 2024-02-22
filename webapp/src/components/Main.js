import React, {useState} from 'react';

const Main = (props) => {
    // userData contiene los datos del usuario que fueron pasados como props desde el componente Login

    return (
        <div>
            <h1>Welcome, {props.username}!</h1>
        </div>
    );
};

export default Main;