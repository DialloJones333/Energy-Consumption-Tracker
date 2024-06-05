import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LowerEnergyCard from "../components/Cards/LowerEnergyCard";
import LowerBillCard from "../components/Cards/LowerBillCard";
import SmartHomeCard from "../components/Cards/SmartHomeCard";
import Accordion from "../components/Accordion";

const TipsAndTricks = () => {

    return (
        <div className="min-h-screen p-5">
            <Navbar />
            <main className="flex flex-row gap-10 mt-10 mb-10">
                <div className="flex flex-col ms-4 gap-10">
                    <div className="w-104 h-94 flex items-center shadow-lg justify-center rounded-lg ">
                        <LowerEnergyCard />
                    </div>
                    <div className="w-104 h-94 flex items-center shadow-lg justify-center rounded-lg">
                        <LowerBillCard />
                    </div>
                    <div className="w-104 h-94 flex items-center justify-center shadow-lg rounded-lg ">
                        <SmartHomeCard />
                    </div>
                </div>
                <div className="flex flex-col items-center gap-10 ms-4 me-4 w-full">
                    <div>
                        <h1 className="text-6xl font-bold font-serif">
                            Tips & Tricks
                        </h1>
                    </div>
                    <div className="w-full shadow-lg flex justify-center rounded-lg">
                        <Accordion />
                    </div>
                    <div className="w-full shadow-lg flex  justify-center rounded-lg">
                        <Accordion />
                    </div>
                    <div className="w-full shadow-lg flex  justify-center rounded-lg">
                        <Accordion />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default TipsAndTricks;