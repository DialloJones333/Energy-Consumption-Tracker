import Navbar from "../components/Navbar";
import DeviceManager from "../components/DeviceManager";
import Footer from "../components/Footer";

const DeviceManagement = () => {
    return (
        <div className="flex flex-col min-h-screen" >
            <Navbar />
            <div className="flex flex-grow items-center justify-center p-10">
                <DeviceManager />
            </div>
            <Footer />
        </div>
    );
};

export default DeviceManagement;
