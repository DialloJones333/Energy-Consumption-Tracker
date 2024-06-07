const ProfileDisplay = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="avatar mb-4">
                <div className="w-48 rounded-full ring ring-stone-400 ring-offset-base-100 ring-offset-2">
                    <img src="images/tree_of_life_avatar_pic.jpeg" alt="profile" />
                </div>
            </div>
            <h1 className="text-5xl font-bold font-serif mb-4">
                Users Name
            </h1>
            <div className="flex flex-row">
                <div className="p-4 border-e-2 border-black">
                    <div className="badge badge-lg bg-stone-300 text-black shadow-md p-4">
                        <h2 className="text-l">
                            Phone Number
                        </h2>
                    </div>
                </div>
                <div className="p-4 border-e-2 border-black">
                    <div className="badge badge-lg bg-stone-300 text-black shadow-md p-4">
                        <h2 className="text-l">
                            Username
                        </h2>
                    </div>
                </div>
                <div className="p-4">
                    <div className="badge badge-lg bg-stone-300 text-black shadow-md p-4">
                        <h2 className="text-l">
                            Email
                        </h2>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <div className="badge badge-lg p-4 bg-stone-300 text-black shadow-md">
                    <h2 className="text-l">
                        Address
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default ProfileDisplay;