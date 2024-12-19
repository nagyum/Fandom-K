import {useEffect, useState} from "react";

const useCredit = () => {
    const [credit, setCredit] = useState(
        Number(localStorage.getItem("credit") || 0)
    );

    const addCredit = (value) => {
        setCredit((prev)=> prev+value);
    };
    const subtractCredit = (value) => {
        setCredit((prev) => prev-value);
    };
    useEffect(()=>{
        localStorage.setItem("credit", String(credit));
    },[credit]);

    
    return{
        credit,
        addCredit,
        subtractCredit,
    };
};

export default useCredit;

