import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DeviceChart from "../components/Charts/DeviceChart";
import '../styles/LandingPage.css';

const Dashboard = () => {

    return (
        <div className="dashboard-page bg-gray-100 min-h-screen p-5">
            <Navbar />
            <main className="flex flex-row gap-10 mt-10">
                <div className="flex flex-col ms-4 gap-10">
                    <div className="w-104 h-72 bg-gray-200 flex items-center justify-center rounded-lg shadow-lg">
                        <DeviceChart />
                    </div>
                    <div className="flex flex-row justify-center">
                        <a href="/device-management">
                            <button className="btn btn-lg btn-outline shadow-md border-slate-800 hover:bg-green-500 text-slate-800 font-bold font-serif">
                                Manage Devices
                            </button>
                        </a>
                    </div>
                    <div className="w-104 h-72 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                        
                    </div>
                        <div className="flex flex-row justify-center">
                            <a href="/">
                                <button className="btn btn-lg btn-outline shadow-md border-slate-800 hover:bg-green-500 text-slate-800 font-bold font-serif">
                                    Compare Rates
                                </button>
                            </a>
                        </div>
                    <div className="w-104 h-72 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                        
                    </div>
                    <div className="flex flex-row justify-center mb-10">
                        <a href="/">
                            <button className="btn btn-lg btn-outline shadow-md border-slate-800 hover:bg-green-500 text-slate-800 font-bold font-serif">
                                Explore Tips & Tricks
                            </button>
                        </a>
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