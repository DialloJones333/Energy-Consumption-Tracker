import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AccountPrefForm = ({ textNoti, emailNoti, disableAll, handleApplyChanges }) => {
    const [localTextNoti, setLocalTextNoti] = useState(textNoti);
    const [localEmailNoti, setLocalEmailNoti] = useState(emailNoti);
    const [localDisableAll, setLocalDisableAll] = useState(disableAll);

    useEffect(() => {
        setLocalTextNoti(textNoti);
        setLocalEmailNoti(emailNoti);
        setLocalDisableAll(disableAll);
    }, [textNoti, emailNoti, disableAll]);

    const handleToggle = (field, value) => {
        let updatedPreferences;
        if (field === 'disableAll') {
            updatedPreferences = {
                allow_text_notifications: false,
                allow_email_notifications: false,
                disable_all_notifications: value,
            };
            setLocalTextNoti(false);
            setLocalEmailNoti(false);
            setLocalDisableAll(value);
        } else {
            updatedPreferences = {
                allow_text_notifications: field === 'textNoti' ? value : localTextNoti,
                allow_email_notifications: field === 'emailNoti' ? value : localEmailNoti,
                disable_all_notifications: false,
            };
            setLocalDisableAll(false);
            if (field === 'textNoti') setLocalTextNoti(value);
            if (field === 'emailNoti') setLocalEmailNoti(value);
        }
        handleApplyChanges(updatedPreferences);
    };

    return (
        <div className="flex flex-col w-full">
            <h2 className="text-3xl font-bold mb-5 text-center">
                Your Preferences
            </h2>
            <form className="w-full">
                <div className="flex items-center justify-between p-4 border-b-2">
                    <label className="block text-xl font-bold" htmlFor="text-noti">
                        Allow Text Notifications?
                    </label>
                    <input
                        type="checkbox"
                        checked={localTextNoti}
                        onChange={() => handleToggle('textNoti', !localTextNoti)}
                        className={`checkbox checkbox-lg shadow-lg ${localTextNoti ? 'checkbox-success' : 'checkbox-error'}`}
                    />
                </div>
                <div className="flex items-center justify-between p-4 border-b-2">
                    <label className="block text-xl font-bold" htmlFor="email-noti">
                        Allow Email Notifications
                    </label>
                    <input
                        type="checkbox"
                        checked={localEmailNoti}
                        onChange={() => handleToggle('emailNoti', !localEmailNoti)}
                        className={`checkbox checkbox-lg shadow-lg ${localEmailNoti ? 'checkbox-success' : 'checkbox-error'}`}
                    />
                </div>
                <div className="flex items-center justify-between p-4 border-b-2">
                    <label className="block text-xl font-bold" htmlFor="disable">
                        Disable All Notifications?
                    </label>
                    <input
                        type="checkbox"
                        checked={localDisableAll}
                        onChange={() => handleToggle('disableAll', !localDisableAll)}
                        className={`checkbox checkbox-lg shadow-lg ${localDisableAll ? 'checkbox-success' : 'checkbox-error'}`}
                    />
                </div>
            </form>
        </div>
    );
};

AccountPrefForm.propTypes = {
    textNoti: PropTypes.bool.isRequired,
    emailNoti: PropTypes.bool.isRequired,
    disableAll: PropTypes.bool.isRequired,
    handleApplyChanges: PropTypes.func.isRequired,
};

export default AccountPrefForm;