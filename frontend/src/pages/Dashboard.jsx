import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DeviceChart from "../components/Charts/DeviceChart";
import MiniCompareChart from "../components/Charts/MiniCompareChart";
import Carousel from "../components/Carousel";
import '../styles/LandingPage.css';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-100 min-h-screen p-5">
            <Navbar />
            <main className="flex flex-row gap-10 mt-10">
                <div className="flex flex-col ms-4 gap-10">
                    <div className="w-104 h-72 bg-gray-100 flex items-center justify-center rounded-lg ">
                        <DeviceChart />
                    </div>
                    <div className="flex flex-row justify-center">
                        <button onClick={() => navigate('/device-management')} className="btn btn-lg btn-outline shadow-md border-slate-800 hover:bg-green-500 text-slate-800 font-bold font-serif">
                            Manage Devices
                        </button>
                    </div>
                    <div className="w-104 h-72 bg-gray-100 flex items-center justify-center rounded-lg">
                        <MiniCompareChart />
                    </div>
                        <div className="flex flex-row justify-center">
                            <button onClick={() => navigate('/compare-rates')} className="btn btn-lg btn-outline shadow-md border-slate-800 hover:bg-green-500 text-slate-800 font-bold font-serif">
                                Compare Rates
                            </button>
                        </div>
                    <div className="w-104 h-72 bg-gray-100 flex items-center justify-center shadow-lg rounded-lg ">
                        <Carousel />
                    </div>
                    <div className="flex flex-row justify-center mb-10">
                        <button onClick={() => navigate('/tips-and-tricks')} className="btn btn-lg btn-outline shadow-md border-slate-800 hover:bg-green-500 text-slate-800 font-bold font-serif">
                            Explore Tips & Tricks
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-10 w-full">
                    <div>
                        <h1 className="text-6xl font-bold font-serif">
                            Dashboard
                        </h1>
                    </div>
                    <div className="w-full max-w-4xl h-96 bg-gray-200 shadow-lg flex items-center justify-center rounded-lg">
                        
                    </div>
                    <div className="w-full max-w-4xl h-96 bg-gray-200 shadow-lg flex items-center justify-center rounded-lg">
                        
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Dashboard;