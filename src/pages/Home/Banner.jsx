import { Link } from "react-router-dom";
import bannerImg from "./../../assets/banner.png";

const Banner = () => {
    
  return (
    <div className="w-full h-screen  flex items-center justify-center gap-5">
      <dir >
        <h1 className='text-[#1C2B35] text-4xl font-bold'>New Collection For Fall</h1>
        <p className="text-lg text-[#2A414F]  ">Discover all the new arrivals of ready-to-wear collection.</p>
        <Link to='/products'>
        <button className="font-bold mt-6 px-3 py-2 bg-secondary text-white rounded-xl">Shop Now</button>
        </Link>
      </dir>
      <dir className=' '>
        <img className="h-[400px] shadow-lg " src={bannerImg} alt="" />
      </dir>
    </div>
  );
};

export default Banner;
