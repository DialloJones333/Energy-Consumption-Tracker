

const Carousel = () => {
    
    return (
        <div className="carousel w-full h-full">
            <div id="slide1" className="carousel-item relative w-full flex items-center justify-center">
                    <p className="text-center mx-16">
                        Hey
                    </p>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-circle bg-stone-400 hover:bg-green-500 text-black">❮</a>
                    <a href="#slide2" className="btn btn-circle bg-stone-400 hover:bg-green-500 text-black">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full flex items-center justify-center">
                <p className="text-center mx-16">
                    Hello
                </p>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle bg-stone-400 hover:bg-green-500 text-black">❮</a>
                    <a href="#slide3" className="btn btn-circle bg-stone-400 hover:bg-green-500 text-black">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full flex items-center justify-center">
                <p className="text-center mx-16">
                    How you doing
                </p>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle bg-stone-400 hover:bg-green-500 text-black">❮</a>
                    <a href="#slide4" className="btn btn-circle bg-stone-400 hover:bg-green-500 text-black">❯</a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full flex items-center justify-center">
                <p className="text-center mx-16">
                    How it going
                </p>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle bg-stone-400 hover:bg-green-500 text-black">❮</a>
                    <a href="#slide1" className="btn btn-circle bg-stone-400 hover:bg-green-500 text-black">❯</a>
                </div>
            </div>
        </div>
    )
}

export default Carousel;