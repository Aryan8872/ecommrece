import down from "../assets/icons/down.svg";

const TopOffer = () => {
    return (
        <div className='relative w-full text-white bg-black h-[48px] flex items-center justify-center'>
            <div className='text-center'>
                <span>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! </span>
                <strong><u>Shop</u></strong>
            </div>

            <div className='absolute right-4 flex items-center gap-2'>
                <span>English</span>
                <img src={down} alt="down icon" />
            </div>
        </div>
    );
};

export default TopOffer;
