import star from "../assets/icons/star.png"
import heart from "../assets/icons/heart.svg"
import eye from "../assets/icons/eye.svg"
const Card = ({ name, discount, rating, price }) => {
    return (
        <div className="w-2xs flex flex-col gap-5 cursor-pointer group">
            <div className="relative w-full h-[250px] bg-[#F5F5F5] rounded-md overflow-hidden">
                <img className="w-full h-full object-contain " src="https://cosmiccomputing.com.np/web/image/product.template/3425/image_1024?unique=b65e119" />
                <div className="absolute top-2 text-white text-xs left-2 py-1 px-3 bg-[#DB4444] rounded-md">
                    <span>{discount}</span>
                </div>

                <div className="absolute top-2 right-2">
                    <img className="mb-2 shadow-md rounded-full" src={heart}/>
                    <img className="shadow-md rounded-full" src={eye}/>
                </div>
                <div className="absolute bottom-0 text-center bg-black text-white w-full translate-y-full group-hover:translate-y-0 duration-300">
                    Add to cart

                </div>
            </div>

            <div className="flex flex-col gap-2">
                <span className="font-medium">{name}</span>
                <span className="text-[#DB4444] font-medium ">${price} &nbsp;<del className="opacity-70 text-black/50">$140</del></span>
                <div className="flex items-center">
                    <img className="w-[10px] h-[10px]" src={star} />
                    <img className="w-[10px] h-[10px]" src={star} />
                    <img className="w-[10px] h-[10px]" src={star} />
                    <img className="w-[10px] h-[10px]" src={star} />
                    <img className="w-[10px] h-[10px]" src={star} />
                    <span className="ml-2 text-xs text-black/50 font-medium">{rating}</span>
                </div>

            </div>


        </div>
    )
}

export default Card
