import Navbar from "../components/Navbar";
import NotificationTable from "../components/NotificationTable";
import Footer from "../components/Footer";

const Notifications = () => {
    return (
        <div className="flex flex-col min-h-screen p-5">
            <Navbar />
            <main className="flex-grow">
                <NotificationTable />
            </main>
            <Footer />
        </div>
    )
}
export default Notifications;