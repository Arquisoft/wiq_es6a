import React from 'react';


const Timer=()=>{
    const [time,setTime]=useState(50);
    useEffect(() => {
        const dec=()=>{
            setTime(time-1); if(time>0) setTimeout(dec,1000);

            setTimeout(dec,1000);

        }
    }, []);
    return <p>time</p>
};