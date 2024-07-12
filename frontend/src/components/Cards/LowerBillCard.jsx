// Component for lower-bill card
const LowerBillCard = () => {

    return (

        <div className="card card-compact w-full h-full">
            <figure><img src="images/LowerBillImage.jpeg" alt="Lower your energy consumption" /></figure>
            <div className="card-body">
                <h2 className="card-title">Want to Lower Your Energy Bill?</h2>
                <p>Check out this page to find out how!</p>
                <div className="card-actions justify-end">
                    <a href='https://www.energy.gov/energysaver/energy-saver-guide-tips-saving-money-and-energy-home' target="_blank" rel="noopener noreferrer">
                        <button className="btn bg-stone-400 text-gray-100 hover:bg-emerald-500">Learn More</button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default LowerBillCard;