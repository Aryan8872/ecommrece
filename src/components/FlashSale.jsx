import { useState } from "react"
import { useFirst } from "../context/FirstContext"
import SwiperComp from "./SwiperComp"
import UpdateUser from "./UpdateUser"

const FlashSale = () => {
    const { alluser, deleteUser } = useFirst()
    const [showDelete, setShowDelete] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [updateData, setUpdateData] = useState()
    const productData = [
        {
            name: "Product 1",
            price: "1200",
            discount: "20%",
            rating: "4.5"

        },
        {
            name: "Product 2",
            price: "1000",
            discount: "10%",
            rating: "4.1"

        },
        {
            name: "Product 3",
            price: "900",
            discount: "70%",
            rating: "4.9"

        },
        {
            name: "Product 4",
            price: "600",
            discount: "80%",
            rating: "4.1"

        },

        {
            name: "Product 4",
            price: "600",
            discount: "80%",
            rating: "4.1"

        },

        {
            name: "Product 4",
            price: "600",
            discount: "80%",
            rating: "4.1"

        },

        {
            name: "Product 4",
            price: "600",
            discount: "80%",
            rating: "4.1"

        },

        {
            name: "Product 4",
            price: "600",
            discount: "80%",
            rating: "4.1"

        },

    ]     //database bata ako data haru ani hamile aba yo data
    //  haru card lai papss garnu parxa so that each card ma data janxa ani ui ma dekhinxa
    if (!alluser) return null
    return (
        <>
            <div className='container flex flex-col  gap-12 mx-auto px-8 '>
                <div className='flex flex-col gap-3 '>
                    <div className='flex items-center gap-3 h-9'>
                        <div className='w-3 h-full rounded-md  bg-[#DB4444]'>
                        </div>
                        <span className='text-[#DB4444] font-medium '>Today's</span>
                    </div>

                    <div className="w-full flex ">
                        <span className='text-black font-bold text-4xl'>Flash Sales</span>
                        <div className="flex gap-2 ml-auto">
                            <span>left</span>
                            <span>right</span>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <SwiperComp data={productData} />
                </div>

                <div className="w-full flex justify-center mt-12 ">
                    <button className="bg-[#DB4444] text-white px-7 py-3 cursor-pointer rounded-md">
                        View All Categories
                    </button>

                </div>
                <div>
                    <span>All users data</span>
                    <section>
                        {
                            alluser && alluser.map((data, index) => (
                                <>
                                    <div className="flex gap-3 items-center">
                                        <span>{index}</span>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold text-lg">{data.email}</span>
                                            <span className="">{data.username}</span>
                                        </div>
                                        <button className="text-white bg-red-400 rounded-lg px-5 py-3 cursor-pointer"
                                            onClick={() => {
                                                setShowDelete(true)
                                            }}>
                                            Delete
                                        </button>

                                        <button className="" onClick={() => {
                                            setUpdateData(data)
                                            setShowUpdate(true)

                                        }}>Update</button>
                                        {
                                            showDelete == true &&
                                            (
                                                <div className="fixed inset-0 z-[9999] bg-black/30 w-full h-full">
                                                    <div className="absolute left-[30%] top-[30%] flex flex-col bg-white gap-5 w-[45%] p-6">
                                                        <span>are you sure you want to delete the data of user {data.email}?</span>
                                                        <div className="flex justify-between w-full">
                                                            <button className="text-white p-2 shadow-md bg-red-300"
                                                                onClick={() => {
                                                                    deleteUser(data._id)
                                                                    setShowDelete(false)
                                                                }

                                                                }>
                                                                Delete
                                                            </button>
                                                            <button
                                                                onClick={() => setShowDelete(false)}
                                                                className="p-2 shadow-md">cancel</button>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        }
                                    </div>

                                </>
                            ))
                        }
                    </section>
                </div>
            </div>

            {
                showUpdate &&
                <UpdateUser data={updateData} hideFunction={() => setShowUpdate(false)} />
            }

        </>
    )
}

export default FlashSale
