import Navbar from "../components/Navbar";
import TabBar from "../components/TabBar";
import ProfileDisplay from "../components/ProfileDisplay";
import ProfileForm from "../components/ProfileForm";
import Footer from "../components/Footer";

const Profile = () => {
    return (
        <div className="min-h-screen flex flex-col p-5">
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
            <main className="flex flex-row flex-grow ms-4 mt-10">
                <div className="flex flex-col gap-10 w-2/4">
                    <div className="me-8 h-104 flex items-start justify-center shadow-xl rounded-lg">
                        <ProfileDisplay />
                    </div>
                </div>
                <div className="flex flex-col me-4 gap-10 mb-10 w-2/4">
                    <div className="h-104 shadow-xl flex rounded-lg">
                        <ProfileForm />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Profile;