import Navbar from "../components/Navbar";
import TabBar from "../components/TabBar";
import Footer from "../components/Footer";

const AccountPreferences = () => {
    return (
        <div className="min-h-screen p-5">
            <Navbar />
            <section className="flex flex-row w-full items-center">
                <div className="w-full h-72 flex border-b-2 border-slate-800">
                    <div className="flex flex-row ms-4 items-center">
                        <h1 className="text-6xl font-bold font-serif mb-10">
                            Account Preferences
                        </h1>
                    </div>
                    <TabBar />
                </div>
            </section>
            <main className="flex flex-row ms-4 mt-10">
                <div className="flex flex-col gap-10 w-2/4">
                    <div className="h-104 bg-gray-200 me-8 flex items-start justify-center shadow-lg rounded-lg">
                        Something
                    </div>
                </div>
                <div className="flex flex-col me-4 gap-10 mb-10 w-2/4">
                    <div className="h-104 bg-gray-200 shadow-lg items-center justify-center flex rounded-lg">
                        Something else
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default AccountPreferences;