import Navbar from "../components/Navbar";
import DeviceManager from "../components/DeviceManager";
import Footer from "../components/Footer";

const DeviceManagement = () => {
    return (
        <div className="min-h-screen p-5" >
            <Navbar />
            <DeviceManager />
            <Footer />
        </div>
    );
};

export default DeviceManagement;
