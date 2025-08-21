import { useFirst } from "../context/FirstContext"
import SwiperComp from "./SwiperComp"

const FlashSale = () => {
    const { alluser } = useFirst()

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
                                <span>{data._id}</span>
                                <span>{data.email}</span>
                                <span>{data.username}</span>
                                <span>{data.password}</span>

                            </>
                        ))
                    }
                </section>
            </div>
        </div>
    )
}

export default FlashSale
