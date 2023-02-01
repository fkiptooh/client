import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const LoadingToRedirect = () =>{

    const [count, setCount] = useState(5);
    let navigate = useNavigate()

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((curretCount)=> --curretCount);
        }, 1000);

        count === 0 && navigate('login');
        return ()=> clearInterval(interval); 

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    return(
        <div className="container p-5 text-center">
            <p>Redirecting you in {count} seconds</p>
        </div>
    )

}

export default LoadingToRedirect;