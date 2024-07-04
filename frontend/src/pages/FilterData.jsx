import Navbar from "../components/Navbar";
import FilterDataForm from "../components/Forms/FilterDataForm";
import FilterDataChart from "../components/Charts/FilterDataChart";
import Footer from "../components/Footer";

const FilterData = () => {
    

    return (
        <div className="flex flex-col min-h-screen p-5 font-serif">
            <Navbar />
            <main className="flex flex-grow items-center justify-center gap-10 ">
                <div className="flex flex-col ms-5">
                    <div className="w-104 flex items-center justify-center rounded-lg ">
                        <FilterDataForm />
                    </div>
                </div>
                <div className="flex flex-col items-end gap-10 me-5 w-full">
                    <div className="w-full max-w-5xl h-104 bg-white shadow-2xl flex items-center justify-center rounded-lg">
                        <FilterDataChart />
                    </div>
                </div>
            </main>
                <Footer />
        </div>
    );
}

export default FilterData;