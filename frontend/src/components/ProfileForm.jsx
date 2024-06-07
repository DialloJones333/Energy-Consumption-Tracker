import { useEffect, useRef } from 'react';

const ProfileForm = () => {
    const nameInputRef = useRef(null);

    useEffect(() => {
        if (nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col p-4 w-full">
            <h2 className="text-3xl font-bold mb-4 text-center">
                Your Info
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
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center p-2">
                    <div className="w-1/2 p-4">
                        <label className="block text-xl font-bold mb-2" htmlFor="last-name">
                            Username
                        </label>
                        <input
                            className="shadow-lg appearance-none border rounded w-full p-2 text-slate-800 text-lg leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="username"
                            type="text"
                            placeholder="Change your username"
                        />
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/2 p-2">
                        <label className="block text-xl font-bold mb-2" htmlFor="first-name">
                            Phone Number
                        </label>
                        <input
                            className="shadow-lg appearance-none border rounded w-full p-2 text-slate-800 text-lg leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="phone-number"
                            type="tel"
                            placeholder="Change your phone number"
                        />
                    </div>
                    <div className="w-1/2 p-2">
                        <label className="block text-xl font-bold mb-2" htmlFor="last-name">
                            Email
                        </label>
                        <input
                            className="shadow-lg appearance-none border rounded w-full p-2 text-slate-800 text-lg leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="email"
                            type="email"
                            placeholder="Change your email"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;