const SmartHomeCard = () => {

    return (

        <div className="card card-compact w-full h-full">
            <figure><img src="images/SmartHomeImage.jpeg" alt="Lower your energy consumption" /></figure>
            <div className="card-body">
                <h2 className="card-title">Want to Learn About The Advantages of Smart Devices?</h2>
                <p>Check out this page!</p>
                <div className="card-actions justify-end">
                    <a href='https://www.cnet.com/home/smart-home/' target="_blank" rel="noopener noreferrer">
                        <button className="btn bg-stone-400 text-gray-100 hover:bg-emerald-500">Learn More</button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SmartHomeCard;