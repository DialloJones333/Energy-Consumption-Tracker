import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LowerEnergyCard from "../components/Cards/LowerEnergyCard";

const TipsAndTricks = () => {

    return (
        <div className="min-h-screen p-5">
            <Navbar />
            <main className="flex flex-row gap-10 mt-10 mb-10">
                <div className="flex flex-col ms-4 gap-10">
                    <div className="w-104 h-94 flex items-center shadow-lg justify-center rounded-lg ">
                        <LowerEnergyCard />
                    </div>
                    <div className="w-104 h-94 bg-gray-200 flex items-center shadow-lg justify-center rounded-lg">
                        <LowerEnergyCard />
                    </div>
                    <div className="w-104 h-94 bg-gray-200 flex items-center justify-center shadow-lg rounded-lg ">
                        <LowerEnergyCard />
                    </div>
                </div>
                <div className="flex flex-col items-center gap-10 w-full">
                    <div>
                        <h1 className="text-6xl font-bold font-serif">
                            Tips & Tricks
                        </h1>
                    </div>
                    <div className="w-full max-w-4xl h-96 bg-gray-200 shadow-lg flex items-center justify-center rounded-lg">
                        
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default TipsAndTricks;