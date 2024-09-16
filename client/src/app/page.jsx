'use client'
//use client is written always when the file is for client page

import Slider from "../../components/Slider/Slider";
import Products from "./products/homeProducts";


export default function Home() {
  return (
    <div>
      <div className="relative w-full h-full">
        {/* In jsx our images and videos are stored in public...and simply name that image in src  */}
        <video className="w-full h-full object-cover" src="video1.mp4" autoPlay loop muted/>
        <div></div>
        <Slider />
        <Products/>
      </div>
    </div>
  );
}
