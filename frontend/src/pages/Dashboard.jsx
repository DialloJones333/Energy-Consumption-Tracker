import Navbar from "../components/Navbar";
import '../styles/LandingPage.css';

const Dashboard = () => {

    return (
        <div className="dashboard-page bg-gray-100 min-h-screen p-5">
            <Navbar />
            <div className="flex flex-row gap-10 mt-10">
                <div className="flex flex-col items-start ms-4 gap-10">
                    <div className="w-104 h-72 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                        
                    </div>
                    <div className="w-104 h-72 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                        
                    </div>
                    <div className="w-104 h-72 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                        
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
            </div>
        </div>
    );
}

export default Dashboard;