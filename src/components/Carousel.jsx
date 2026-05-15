import ImageContainer from "./ImageContainer.jsx";

import img1 from "../assets/images/pexels-1.jpg";
import img2 from "../assets/images/pexels-2.jpg";
import img3 from "../assets/images/pexels-3.jpg";
import img4 from "../assets/images/pexels-4.jpg";
import img5 from "../assets/images/pexels-5.jpg";

export default function Carousel() {
    return (
        <div className="h-screen bg-[#131313] flex items-center mt-[40px]">
            
            {/* viewport */}
            <div className="w-full overflow-x-auto overflow-y-hidden">
                
                {/* track */}
                <div className="flex gap-[3vw] w-max px-[10vw]">
                    
                    <ImageContainer imageSource={img1} />
                    <ImageContainer imageSource={img2} />
                    <ImageContainer imageSource={img3} />
                    <ImageContainer imageSource={img4} />
                    <ImageContainer imageSource={img5} />

                </div>

            </div>

        </div>
    );
}