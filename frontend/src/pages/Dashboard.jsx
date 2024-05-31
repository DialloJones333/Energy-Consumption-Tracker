import Navbar from "../components/Navbar";
import '../styles/LandingPage.css'

const Dashboard = () => {

    return (
        <div className="dashboard-page bg-gray-100 min-h-screen p-5">
            <Navbar />
            <div className="flex flex-col ms-4 place-items-start gap-10 mt-10">
                <div className="w-80 h-48 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                    
                </div>
                <div className="w-80 h-48 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                    
                </div>
                <div className="w-80 h-48 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                    
                </div>
            </div>
        </div>
    )
}

export default Dashboard;