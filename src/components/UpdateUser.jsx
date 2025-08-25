import { useEffect, useState } from "react"
import { useFirst } from "../context/FirstContext"

const UpdateUser = ({ data, hideFunction }) => {

    const { updateUser } = useFirst()
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        phoneNumber: "",
    })

    useEffect(() => {
        setUserData(data)
    }, [])
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
    return (
        <div className="fixed inset-0 z-[9999] bg-black/30 w-full h-full">
            <div className="absolute left-[30%] top-[30%] flex flex-col bg-white gap-5 w-[45%] p-6">
                <span>Update User</span>

                <div className="flex flex-col gap-5">
                    <label>Email</label>
                    <input name="email" className="border-2" onChange={(e) => handleChange(e)} value={userData.email} />

                    <label>username</label>
                    <input name="username" className="border-2" onChange={(e) => handleChange(e)} value={userData.username} />

                    <label>phone number</label>
                    <input name="phoneNumber" className="border-2" onChange={(e) => handleChange(e)} value={userData.phoneNumber} />

                </div>

                <div className="flex w-full justify-between">
                    <button
                        onClick={() => {
                            updateUser(userData)
                            hideFunction()
                        }}
                        className="bg-blue-400 text-white rounded-lg cursor-pointer p-2">Update</button>
                    <button className="bg-red-300 text-white rounded-lg p-2 cursor-pointer" onClick={hideFunction} >Cancel</button>


                </div>
            </div>

        </div>
    )
}

export default UpdateUser
