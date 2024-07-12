import Navbar from "../components/Navbar";
import NotificationTable from "../components/NotificationTable";
import Footer from "../components/Footer";

// Component to render the Notifications page
const Notifications = () => {
    return (
        <div className="flex flex-col min-h-screen p-5 font-serif">
            <Navbar />
            <main className="flex-grow">
                <NotificationTable />
            </main>
            <Footer />
        </div>
    )
}
export default Notifications;