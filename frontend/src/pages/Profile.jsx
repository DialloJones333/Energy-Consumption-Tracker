import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import TabBar from "../components/TabBar";
import ProfileDisplay from "../components/ProfileDisplay";
import ProfileForm from "../components/Forms/ProfileForm";
import Footer from "../components/Footer";
import AuthContext from '../../services/AuthContext';

const Profile = () => {
    // Get the user data from the AuthContext provider
    const { user, setUser } = useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    // Update user profile fields in local state
    useEffect(() => {
        // Check if there is a user
        if (user) {
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setUsername(user.username);
            setPhoneNumber(user.phone_number);
            setEmail(user.email);
        }
    }, [user]); // Update when user changes

    //Handle changes in the form
    const handleApplyChanges = (newFirstName, newLastName, newUsername, newPhoneNumber, newEmail) => {
        // Update user profile fields in local state
        const updatedUser = {
            // Spread the existing user data
            ...user,
            first_name: newFirstName,
            last_name: newLastName,
            username: newUsername,
            phone_number: newPhoneNumber,
            email: newEmail
        };
        // Update the user data in the AuthContext provider
        setUser(updatedUser);
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
                    <div className="me-8 h-104 flex items-center justify-center shadow-2xl rounded-lg font-serif">
                        <ProfileDisplay
                            firstName={firstName}
                            lastName={lastName}
                            username={username}
                            phoneNumber={phoneNumber}
                            email={email}
                        />
                    </div>
                </div>
                <div className="flex flex-col me-4 gap-10 mb-10 w-2/4">
                    <div className="min-h-104 overflow-auto shadow-2xl flex rounded-lg font-serif">
                        <ProfileForm
                            firstName={firstName}
                            lastName={lastName}
                            username={username}
                            phoneNumber={phoneNumber}
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