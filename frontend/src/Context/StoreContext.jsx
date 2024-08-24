import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext = createContext();

const StoreContextProvider = (props) => {

    const url = import.meta.env.VITE_BACKEND_URL;

    const [token, setToken] = useState("");

    const [userResumeData, setUserResumeData] = useState({});

    const [resumeInfo, setResumeInfo] = useState();

    const [showExperience, setShowExperience] = useState(true);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
    }, [])

    const contextValue = {
        url,
        token,
        setToken,
        userResumeData,
        setUserResumeData,
        resumeInfo,
        setResumeInfo,
        showExperience,
        setShowExperience
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;