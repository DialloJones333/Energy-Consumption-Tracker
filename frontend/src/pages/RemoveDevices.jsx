import Navbar from "../components/Navbar";
import RemoveDevicesForm from "../components/Forms/RemoveDevicesForm";
import Footer from "../components/Footer";

// Component to render the Remove Devices page
const RemoveDevices = () => {

    return (
        <div className="flex flex-col min-h-screen p-5 font-serif" >
            <Navbar />
            <div className="flex flex-grow items-center justify-center p-10">
                <RemoveDevicesForm />
            </div>
            <Footer />
        </div>
    );
};

export default RemoveDevices;
