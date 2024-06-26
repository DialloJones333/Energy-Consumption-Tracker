import PropTypes from 'prop-types';
import api from '../../../services/api';

const AccountPrefForm = ({ textNoti, setTextNoti, emailNoti, setEmailNoti, disableAll, setDisableAll, userId }) => {

    const handleUpdatePreferences = async (e) => {
        e.preventDefault();
        try {
            const preferences = {
                user: userId,
                allow_text_notifications: textNoti,
                allow_email_notifications: emailNoti,
                disable_all_notifications: disableAll
            };
            await api.put(`/notifications/${userId}/`, preferences, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            console.log("Preferences updated successfully!");
        } catch (error) {
            console.error("There was an error updating the user preferences!", error);
        }
    };

    return (
        <div className="flex flex-col w-full">
            <h2 className="text-3xl font-bold mb-5 text-center">
                Your Preferences
            </h2>
            <form className="w-full" onSubmit={handleUpdatePreferences}>
                <div className="flex items-center justify-between p-4 border-b-2">
                    <label className="block text-xl font-bold" htmlFor="text-noti">
                        Allow Text Notifications?
                    </label>
                    <input
                        type="checkbox"
                        checked={textNoti}
                        onChange={() => setTextNoti(!textNoti)}
                        className={`checkbox checkbox-lg shadow-lg ${textNoti ? 'checkbox-success' : 'checkbox-error'}`}
                    />
                </div>
                <div className="flex items-center justify-between p-4 border-b-2">
                    <label className="block text-xl font-bold" htmlFor="email-noti">
                        Allow Email Notifications
                    </label>
                    <input
                        type="checkbox"
                        checked={emailNoti}
                        onChange={() => setEmailNoti(!emailNoti)}
                        className={`checkbox checkbox-lg shadow-lg ${emailNoti ? 'checkbox-success' : 'checkbox-error'}`}
                    />
                </div>
                <div className="flex items-center justify-between p-4 border-b-2">
                    <label className="block text-xl font-bold" htmlFor="disable">
                        Disable All Notifications?
                    </label>
                    <input
                        type="checkbox"
                        checked={disableAll}
                        onChange={() => setDisableAll(!disableAll)}
                        className={`checkbox checkbox-lg shadow-lg ${disableAll ? 'checkbox-success' : 'checkbox-error'}`}
                    />
                </div>
                <div className="flex justify-center mt-4">
                    <button type="submit" className="btn bg-stone-400 hover:bg-emerald-500 text-gray-100 shadow-lg">
                        Save Preferences
                    </button>
                </div>
            </form>
        </div>
    );
};

AccountPrefForm.propTypes = {
    textNoti: PropTypes.bool.isRequired,
    setTextNoti: PropTypes.func.isRequired,
    emailNoti: PropTypes.bool.isRequired,
    setEmailNoti: PropTypes.func.isRequired,
    disableAll: PropTypes.bool.isRequired,
    setDisableAll: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
};

export default AccountPrefForm;