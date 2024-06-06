import Navbar from "../components/Navbar";
import TabBar from "../components/TabBar";
import Footer from "../components/Footer";

const Profile = () => {
    return (
        <div className="min-h-screen p-5">
            <Navbar />
            <section className="flex flex-row w-full items-center">
                <div className="w-full h-72 flex border-b-2 border-slate-800">
                    <div className="flex flex-row ms-4 items-center">
                        <h1 className="text-6xl font-bold font-serif mb-10">
                            Profile
                        </h1>
                    </div>
                    <TabBar />
                </div>
            </section>
            <main className="flex flex-row ms-4 mt-10">
                <div className="flex flex-col gap-10 w-2/4">
                    <div className="bg-gray-200 me-8 h-104 flex items-center justify-center shadow-xl rounded-lg">
                        Something
                    </div>
                </div>
                <div className="flex flex-col gap-10 mb-10 w-2/4">
                    <div className="h-104 bg-gray-200 shadow-lg items-center justify-center flex rounded-lg">
                        Something else
                    </div>
                </div>
                <div className="w-4"></div> {/* Fixed-width gap */}
            </main>
            <Footer />
        </div>
    );
}

export default Profile;