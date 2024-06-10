import Navbar from "../components/Navbar";
import CompareRatesForm from "../components/Forms/CompareRatesForm";
import CompareRatesChart from "../components/Charts/CompareRatesChart";
import Footer from "../components/Footer";

const CompareRates = () => {
    

    return (
        <div className="flex flex-col min-h-screen p-5 font-serif">
            <Navbar />
            <main className="flex flex-grow items-center justify-center gap-10 ">
                <div className="flex flex-col ms-5">
                    <div className="w-104 flex items-center justify-center rounded-lg ">
                        <CompareRatesForm />
                    </div>
                </div>
                <div className="flex flex-col items-end gap-10 me-5 w-full">
                    <div className="w-full max-w-5xl h-104 bg-white shadow-2xl flex items-center justify-center rounded-lg">
                        <CompareRatesChart />
                    </div>
                </div>
            </main>
                <Footer />
        </div>
    );
}

export default CompareRates;