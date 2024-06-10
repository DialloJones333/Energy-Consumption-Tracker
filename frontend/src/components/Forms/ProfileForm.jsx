import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ProfileForm = ({ firstName, lastName, username, phoneNum, email, handleApplyChanges }) => {
    const [localFirstName, setLocalFirstName] = useState(firstName);
    const [localLastName, setLocalLastName] = useState(lastName);
    const [localUsername, setLocalUsername] = useState(username);
    const [localPhoneNum, setLocalPhoneNum] = useState(phoneNum);
    const [localEmail, setLocalEmail] = useState(email);

    const handleApply = () => {
        handleApplyChanges(localFirstName, localLastName, localUsername, localPhoneNum, localEmail);
    };

    const nameInputRef = useRef(null);

    useEffect(() => {
        if (nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, []);

    const navigate = useNavigate();

    return (
        <div className="flex flex-col p-2 w-full">
            <h2 className="text-3xl font-bold mb-2 text-center">
                Change Your Info
            </h2>
            <form className="w-full">
                <div className="flex">
                    <div className="w-1/2 p-2">
                        <label className="block text-xl font-bold mb-2" htmlFor="first-name">
                            First Name
                        </label>
                        <input
                            className="shadow-lg appearance-none border rounded w-full p-2 text-slate-800 text-lg leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="first-name"
                            type="text"
                            placeholder="Change your first name"
                            value={localFirstName}
                            onChange={(e) => setLocalFirstName(e.target.value)}
                            ref={nameInputRef}
                        />
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="block text-xl font-bold mb-2" htmlFor="last-name">
                            Last Name
                        </label>
                        <input
                            className="shadow-lg appearance-none border rounded w-full p-2 text-slate-800 text-lg leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="last-name"
                            type="text"
                            placeholder="Change your last name"
                            value={localLastName}
                            onChange={(e) => setLocalLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center p-2">
                    <div className="w-1/2 p-2">
                        <label className="block text-xl font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow-lg appearance-none border rounded w-full p-2 text-slate-800 text-lg leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="username"
                            type="text"
                            placeholder="Change your username"
                            value={localUsername}
                            onChange={(e) => setLocalUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/2 p-2">
                        <label className="block text-xl font-bold mb-2" htmlFor="phone-number">
                            Phone Number
                        </label>
                        <input
                            className="shadow-lg appearance-none border rounded w-full p-2 text-slate-800 text-lg leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="phone-number"
                            type="tel"
                            placeholder="Change your phone number"
                            value={localPhoneNum}
                            onChange={(e) => setLocalPhoneNum(e.target.value)}
                        />
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="block text-xl font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow-lg appearance-none border rounded w-full p-2 text-slate-800 text-lg leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="email"
                            type="email"
                            placeholder="Change your email"
                            value={localEmail}
                            onChange={(e) => setLocalEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center p-3">
                    <button
                        className="bg-stone-400 hover:bg-emerald-500 text-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-lg"
                        type="button"
                        onClick={handleApply}
                    >
                        Apply
                    </button>
                    <div className="ml-4 flex-grow text-right"> <button
                        className="bg-stone-400 hover:bg-emerald-500 text-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-lg"
                        type="button"
                        onClick={() => navigate('/change-password')}
                    >
                        Change your password
                    </button></div>
                </div>
            </form>
        </div>
    );
};

ProfileForm.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    phoneNum: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    handleApplyChanges: PropTypes.func.isRequired,
};

export default ProfileForm;