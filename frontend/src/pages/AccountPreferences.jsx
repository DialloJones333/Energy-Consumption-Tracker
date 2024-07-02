import { useEffect, useContext, useCallback } from 'react';
import Navbar from "../components/Navbar";
import TabBar from "../components/TabBar";
import AccountPrefDisplay from "../components/AccountPrefDisplay";
import AccountPrefForm from "../components/Forms/AccountPrefForm";
import Footer from "../components/Footer";
import AuthContext from '../../services/AuthContext';
import api from '../../services/api';

// Component to render the Account Preferences page
const AccountPreferences = () => {
    // Access the user's Notification Preferences
    const { notificationPreferences, setNotificationPreferences } = useContext(AuthContext);

    const fetchNotificationPreferences = useCallback(async () => {
        try {
            const response = await api.get('/notification-preferences/', {
                headers: { 'Authorization': `Token ${localStorage.getItem('token')}` }
            });
            setNotificationPreferences(response.data);
        } catch (error) {
            console.error('Error fetching notification preferences:', error);
        }
    }, [setNotificationPreferences]);

    useEffect(() => {
        fetchNotificationPreferences();
    }, [fetchNotificationPreferences]);

    const handleApplyChanges = async (updatedPreferences) => {
        try {
            const response = await api.put('/notification-preferences/', updatedPreferences, {
                headers: { 'Authorization': `Token ${localStorage.getItem('token')}` }
            });
            setNotificationPreferences(response.data);
        } catch (error) {
            console.error('There was an error updating the user preferences!', error);
        }
    };


    return (
        <div className="min-h-screen flex flex-col p-5">
            <Navbar />
            <section className="w-full border-b-2 border-slate-800">
                <div className="flex flex-col ms-4 mt-20">
                    <h1 className="text-6xl font-bold font-serif mb-10">
                        Account Preferences
                    </h1>
                </div>
                <div className="flex justify-center">
                    <TabBar />
                </div>
            </section>
            <main className="flex flex-row flex-grow ms-4 mt-10">
                <div className="flex flex-col gap-10 w-2/4">
                    <div className="me-8 h-104 flex items-center justify-center shadow-2xl rounded-lg font-serif">
                        <AccountPrefDisplay
                            textNoti={notificationPreferences.allow_text_notifications}
                            emailNoti={notificationPreferences.allow_email_notifications}
                            disableAll={notificationPreferences.disable_all_notifications}
                        />
                    </div>
                </div>
                <div className="flex flex-col me-4 gap-10 mb-10 w-2/4">
                    <div className="min-h-104 overflow-auto shadow-2xl flex rounded-lg font-serif">
                        <AccountPrefForm
                            textNoti={notificationPreferences.allow_text_notifications}
                            emailNoti={notificationPreferences.allow_email_notifications}
                            disableAll={notificationPreferences.disable_all_notifications}
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