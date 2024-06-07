import { useEffect, useRef } from 'react';

const LoginForm = () => {
    const userNameInputRef = useRef(null);

    useEffect(() => {
        if (userNameInputRef.current) {
            userNameInputRef.current.focus();
        }
    }, []);

    return (
        <div className=" min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Log In
                </h2>
                <form>
                    <div className="mb-6">
                        <label
                            className="block text-sm font-bold mb-2"
                            htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            ref={userNameInputRef}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-slate-800 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-800 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-stone-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-lg"
                            type="button"
                        >
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
