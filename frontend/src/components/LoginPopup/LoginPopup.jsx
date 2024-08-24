import React, { useContext, useState } from 'react'
import "./LoginPopup.css"
import axios from "axios"
import { StoreContext } from '../../Context/StoreContext'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { toast } from 'react-toastify'
import { Loader2 } from 'lucide-react'


const LoginPopup = () => {
    const navigate = useNavigate();
    const { url, setToken } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Sign Up");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data)
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
            toast.success("Logged In Successfully");
        }
        else {
            toast.error("Wrong Email/Password");
        }
        setLoading(false);
    }
    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <Link to="/"><img src="cross_icon.png" alt="" /></Link>
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Enter your name' required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Enter your password' required />
                </div>
                {loading ? <Button><Loader2 className=' animate-spin' /></Button> : <Button type='submit'>{currState === "Sign Up" ? "Create a account" : "Login"}</Button>}
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {
                    currState === "Login"
                        ? <p>Create a new account? <span className=' text-primary font-bold' onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
                        : <p>Already have an account <span className=' text-primary font-bold' onClick={() => setCurrState("Login")}>Login Here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup