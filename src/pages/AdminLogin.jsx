import { FaMailchimp } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import Apple from "../assets/apple.svg";
import Google from "../assets/google.svg";
import Twitter from "../assets/twitter.svg";

import { useState } from "react";
import { useFirst } from '../context/FirstContext';

const AdminLogin = () => {
    const { login } = useFirst()
    const [userData, setUserData] = useState({ email: "", password: "" })
    
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUserData((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))

    }

    const handleLogin = async () => {
        await login(userData)
    }
    return (
        <div className='bg-[#0F0F0F] min-h-screen flex justify-center items-center'>
            <div className='bg-[#181818] p-6 rounded-lg w-md'>
                <div className="text-center">
                    <span className="text-white font-medium text-2xl">Welcome</span>
                    <p className="text-white mt-2"><span>Dont have an account?</span> <span className="font-semibold">Signup</span></p>
                </div>
                <div className='w-full flex flex-col gap-6 mt-10'>
                    <div className='flex items-center p-2 gap-5 bg-[#111111] shadow-md text-white rounded-md'>
                        <FaMailchimp />
                        <input className='w-full outline-none' name="email" onChange={(e) => handleChange(e)} placeholder='Email address' />
                    </div>
                    <div className='flex items-center p-2 gap-5 bg-[#111111] shadow-md text-white rounded-md'>
                        <RiLockPasswordLine />
                        <input className='w-full outline-none' name="password" onChange={(e) => handleChange(e)} placeholder='Password' />
                    </div>

                    <button className="w-full cursor-pointer hover:bg-blue-600 rounded-md bg-blue-500 text-white p-2 font-medium" onClick={handleLogin}>Login</button>

                    <div className="flex items-center gap-2 text-white">
                        <div className="flex-3/6 bg-white/20 h-[0.2px]">

                        </div>
                        OR
                        <div className="flex-3/6 bg-white/20 h-[0.2px]">

                        </div>

                    </div>

                    <div className="flex justify-between">
                        <div className="flex items-center  rounded-md bg-[#282828] shadow-md py-1 px-12">
                            <img src={Apple} className="w-8 " />

                        </div>
                        <div className="flex items-center rounded-md bg-[#282828] shadow-md py-1 px-12">
                            <img src={Google} className="w-8 h-6" />

                        </div>
                        <div className="flex items-center rounded-md bg-[#282828] shadow-md py-1 px-12">
                            <img src={Twitter} className="w-8 h-6" />

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default AdminLogin
