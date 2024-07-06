import { useState, useEffect } from "react";
import { dashboardTips } from "../data/tipsData";

const Carousel = () => {
    const [selectedTips, setSelectedTips] = useState([]);

    useEffect(() => {
        const shuffleArray = (array) => {
            return array.sort(() => Math.random() - 0.5);
        };

        const getRandomTips = () => {
            const shuffledTips = shuffleArray([...dashboardTips]);
            return shuffledTips.slice(0, 4);
        };

        setSelectedTips(getRandomTips());
    }, []);

    return (
        <div className="carousel w-full h-full">
            {selectedTips.map((tip, index) => (
                <div id={`slide${index + 1}`} key={tip.id} className="carousel-item relative w-full flex items-center justify-center">
                    <p className="text-center mx-16">
                        {tip.content}
                    </p>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href={`#slide${(index === 0 ? selectedTips.length : index)}`} className="btn btn-circle bg-stone-300 hover:bg-emerald-500 text-black">❮</a>
                        <a href={`#slide${(index + 2 > selectedTips.length ? 1 : index + 2)}`} className="btn btn-circle bg-stone-300 hover:bg-emerald-500 text-black">❯</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Carousel;