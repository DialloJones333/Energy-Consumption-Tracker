const SmartHomeCard = () => {

    return (

        <div className="card card-compact w-full h-full">
            <figure><img src="images/SmartHomeImage.jpeg" alt="Lower your energy consumption" /></figure>
            <div className="card-body">
                <h2 className="card-title">Want to Learn About The Advantages of Smart Devices?</h2>
                <p>Check out this page!</p>
                <div className="card-actions justify-end">
                    <button className="btn bg-stone-400 text-gray-100 hover:bg-green-500">Learn More</button>
                </div>
            </div>
        </div>
    )
}

export default SmartHomeCard;