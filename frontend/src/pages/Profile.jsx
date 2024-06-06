import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {

    return (
        <div className=" min-h-screen">
            <Navbar/>
            <main className="flex flex-row gap-10 mt-10">
                <div className="flex flex-col ms-4 gap-10">
                    <div className="w-104 h-72 bg-gray-200 shadow-lg flex items-center justify-center rounded-lg ">
                        
                    </div>
                    <div className="w-104 h-72 bg-gray-200 shadow-lg flex items-center justify-center rounded-lg">
                        
                    </div>
                    <div className="w-104 h-72 bg-gray-200 flex items-center justify-center shadow-lg rounded-lg ">
                        
                    </div>
                </div>
                <div className="flex flex-col items-center gap-10 w-full">
                    <div>
                        <h1 className="text-6xl font-bold font-serif mb-10">
                            Profile
                        </h1>
                    </div>
                    <div className="w-full bg-gray-200 max-w-4xl h-96 flex items-center justify-center shadow-xl rounded-lg">
                        
                    </div>
                    <div className="w-full bg-gray-200 max-w-4xl h-96 flex items-center justify-center shadow-xl rounded-lg">
                        
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Profile;