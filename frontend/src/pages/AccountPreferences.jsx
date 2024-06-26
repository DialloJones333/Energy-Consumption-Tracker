import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import TabBar from "../components/TabBar";
import AccountPrefDisplay from "../components/AccountPrefDisplay";
import AccountPrefForm from "../components/Forms/AccountPrefForm";
import Footer from "../components/Footer";
import AuthContext from '../../services/AuthContext';
import api from '../../services/api';

const AccountPreferences = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [notificationSettings, setNotificationSettings] = useState({
        allow_text_notifications: false,
        allow_email_notifications: false,
        disable_all_notifications: false,
    });

    useEffect(() => {
        const fetchPreferences = async () => {
            if (user) {
                try {
                    const response = await api.get('/notifications/', {
                        headers: {
                            'Authorization': `Token ${localStorage.getItem('token')}`
                        }
                    });
                    setNotificationSettings(response.data);
                } catch (error) {
                    console.error("There was an error fetching the notification settings!", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchPreferences();
    }, [user]);

    const handleApplyChanges = async (updatedPreferences) => {
        try {
            const response = await api.put('/notifications/', updatedPreferences, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            setNotificationSettings(response.data);
            console.log("Preferences updated successfully!");
        } catch (error) {
            console.error("There was an error updating the user preferences!", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col p-5">
            <Navbar />
            <section className="w-full border-b-2 border-slate-800 ">
                <div className="flex flex-col ms-4 mt-20">
                    <h1 className="text-6xl font-bold font-serif mb-10">Account Preferences</h1>
                </div>
                <div className="flex justify-center">
                    <TabBar />
                </div>
            </section>
            <main className="flex flex-row flex-grow ms-4 mt-10">
                <div className="flex flex-col gap-10 w-2/4">
                    <div className="me-8 h-104 flex items-center justify-center shadow-2xl rounded-lg font-serif">
                        <AccountPrefDisplay
                            textNoti={notificationSettings.allow_text_notifications}
                            emailNoti={notificationSettings.allow_email_notifications}
                            disableAll={notificationSettings.disable_all_notifications}
                        />
                    </div>
                </div>
                <div className="flex flex-col me-4 gap-10 mb-10 w-2/4">
                    <div className="min-h-104 overflow-auto shadow-2xl flex rounded-lg font-serif">
                        <AccountPrefForm
                            textNoti={notificationSettings.allow_text_notifications}
                            emailNoti={notificationSettings.allow_email_notifications}
                            disableAll={notificationSettings.disable_all_notifications}
                            handleApplyChanges={handleApplyChanges}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AccountPreferences;