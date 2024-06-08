import PropTypes from 'prop-types';

const AccountPrefDisplay = ({ textNoti, emailNoti, disableAll }) => {
    return (
        <div className="stats stats-vertical h-full w-full bg-inherit text-slate-800">
            <div className="stat shadow relative">
                <div className="stat-value text-3xl">Allow notifications via text</div>
                <div className="stat-desc text-slate-800">Want to receive text messages?</div>
                <span className={`absolute top-16 right-5 badge badge-lg p-4 text-xl ${textNoti ? 'badge-success' : 'badge-error'} shadow-md`}>{textNoti ? 'True' : 'False'}</span>
            </div>
            <div className="stat shadow relative">
                <div className="stat-value text-3xl">Allow notifications via email</div>
                <div className="stat-desc text-slate-800">Want to receive emails?</div>
                <span className={`absolute top-16 right-5 badge badge-lg p-4 text-xl ${emailNoti ? 'badge-success' : 'badge-error'} shadow-md`}>{emailNoti ? 'True' : 'False'}</span>
            </div>
            <div className="stat shadow relative">
                <div className="stat-value text-3xl">Disable all notifications</div>
                <div className="stat-desc text-slate-800">Want to disable texts, emails, and on-site notifications?</div>
                <span className={`absolute top-16 right-5 badge badge-lg p-4 text-xl ${disableAll ? 'badge-success' : 'badge-error'} shadow-md`}>{disableAll ? 'True' : 'False'}</span>
            </div>
        </div>
    );
}

AccountPrefDisplay.propTypes = {
    textNoti: PropTypes.bool.isRequired,
    emailNoti: PropTypes.bool.isRequired,
    disableAll: PropTypes.bool.isRequired,
};

export default AccountPrefDisplay;