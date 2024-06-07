import Navbar from "../components/Navbar";
import TabBar from "../components/TabBar";
import ProfileDisplay from "../components/ProfileDisplay";
import Footer from "../components/Footer";

const Profile = () => {
    return (
        <div className="min-h-screen p-5">
            <Navbar />
            <section className="w-full border-b-2 border-slate-800 ">
                <div className="flex flex-col ms-4 mt-20">
                    <h1 className="text-6xl font-bold font-serif mb-10">
                        Profile
                    </h1>
                </div>
                <div className="flex justify-center">
                    <TabBar />
                </div>
            </section>
            <main className="flex flex-row ms-4 mt-10">
                <div className="flex flex-col gap-10 w-2/4">
                    <div className="h-104 bg-gray-200 me-8 flex items-start justify-center shadow-lg rounded-lg">
                        <ProfileDisplay />
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

export default Profile;