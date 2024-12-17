import {useEffect, useState} from "react";

const useCredit = () => {
    const [credit, setCredit] = useState(
        Number(localStorage.getItem("credit") || 0)
    );

    const addCredit = (value) => {
        setCredit((prev)=> prev+value);
    };
    const subtreactCredit = (value) => {
        setCredit((prev) => prev-value);
    };
    useEffect(()=>{
        localStorage.setItem("cerdit", credit);
    },[credit]);

    return{
        credit,
        addCredit,
        subtreactCredit,
    };
};

export default useCredit;

