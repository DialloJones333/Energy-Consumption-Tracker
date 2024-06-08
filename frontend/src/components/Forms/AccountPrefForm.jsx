import PropTypes from 'prop-types';

const AccountPrefForm = ({ textNoti, setTextNoti, emailNoti, setEmailNoti, disableAll, setDisableAll }) => {
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
};

export default AccountPrefForm;