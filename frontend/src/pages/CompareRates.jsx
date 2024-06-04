import Navbar from "../components/Navbar";
import CompareRatesForm from "../components/CompareRatesForm";
import CompareRatesChart from "../components/Charts/CompareRatesChart";
import Footer from "../components/Footer";

const CompareRates = () => {
    

    return (
        <div className="dashboard-page min-h-screen p-5">
            <Navbar />
            <main className=" items-center flex flex-row gap-10 ">
                <div className="flex flex-col ms-5">
                    <div className="w-104 flex items-center justify-center rounded-lg ">
                        <CompareRatesForm />
                    </div>
                </div>
                <div className="flex flex-col items-end gap-10 me-5 w-full">
                    <div className="w-full max-w-5xl h-104 shadow-xl flex items-center justify-center rounded-lg">
                        <CompareRatesChart />
                    </div>
                </div>
            </main>
                <Footer />
        </div>
    );
}

export default CompareRates;