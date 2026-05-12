import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const LikeButton = () => {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <button
            onClick={() => setIsLiked(!isLiked)}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
        >
            <FaHeart
                size={18}
                className={isLiked ? "text-red-500" : "text-black"}
            />
        </button>
    );
};

export default LikeButton;