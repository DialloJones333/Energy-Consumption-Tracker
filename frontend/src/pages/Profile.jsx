import { useState } from "react";
import Navbar from "../components/Navbar";
import TabBar from "../components/TabBar";
import ProfileDisplay from "../components/ProfileDisplay";
import ProfileForm from "../components/Forms/ProfileForm";
import Footer from "../components/Footer";

const Profile = () => {
    const [firstName, setFirstName] = useState('Diallo')
    const [lastName, setLastName] = useState('Jones')
    const [username, setUsername] = useState('DialloJones23')
    const [phoneNum, setPhoneNum] = useState('7049960661')
    const [email, setEmail] = useState('diallojones23@gmail.com')


    const handleApplyChanges = (newFirstName, newLastname, newUsername, newPhoneNum, newEmail) => {
        setFirstName(newFirstName);
        setLastName(newLastname);
        setUsername(newUsername);
        setPhoneNum(newPhoneNum);
        setEmail(newEmail);
    };

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
                    <div className="me-8 h-104 flex items-start justify-center shadow-2xl rounded-lg">
                        <ProfileDisplay
                            firstName={firstName}
                            lastName={lastName}
                            username={username}
                            phoneNum={phoneNum}
                            email={email}
                        />
                    </div>
                </div>
                <div className="flex flex-col me-4 gap-10 mb-10 w-2/4">
                    <div className="h-104 shadow-2xl flex rounded-lg">
                        <ProfileForm
                            firstName={firstName}
                            lastName={lastName}
                            username={username}
                            phoneNum={phoneNum}
                            email={email}
                            handleApplyChanges={handleApplyChanges}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Profile;