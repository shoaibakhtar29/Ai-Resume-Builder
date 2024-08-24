import React, { useContext } from 'react'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
import { StoreContext } from '@/Context/StoreContext'
import { LucideLogOut } from 'lucide-react'
import { toast } from 'react-toastify'

const Header = () => {
    const { token } = useContext(StoreContext);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
        toast.success("Logged Out Successfully");
    }

    return (
        <div className=' p-3 px-5 flex justify-between shadow-md'>
            <Link to={"/"}><img src='logo.svg' alt="logo" width={190} height={190} /></Link>
            <div>
                <ul className=' hidden md:flex list-none gap-3 mt-2 text-lg font-bold'>
                    <li className=' hover:text-primary cursor-pointer shadow-sm'><a href="/">Home</a></li>
                    <li className=' hover:text-primary cursor-pointer shadow-sm'><a href="https://shoaibakhtar.org/about" target='_blank'>About</a></li>
                    <li className=' hover:text-primary cursor-pointer shadow-sm'><a href="https://shoaibakhtar.org/contact" target='_blank'>Contact</a></li>
                    <li className=' hover:text-primary cursor-pointer shadow-sm'><a href="https://shoaibakhtar.org/privacy" target='_blank'>Privacy</a></li>
                </ul>
            </div>
            <div>
                {
                    token ?
                        <div className=' flex gap-2 items-center'>
                            <Link to={'/dashboard'}><Button variant="outline">Dashboard</Button></Link>
                            <Button onClick={handleLogout}><LucideLogOut /></Button>
                        </div>
                        : <Link to={'/sign-in'}><Button>Get Started</Button></Link>
                }
            </div>
        </div>
    )
}

export default Header
