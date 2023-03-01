import React from 'react';

export default function Timer(props){
    const [seconds, setSeconds] = React.useState(props.start);

    setTimeout(()=>{
        setSeconds((seconds)=>seconds+1)
    },1000);

    return (
        <div>
            <h2>
                Timer: {seconds}
            </h2>
        </div>
    );
}