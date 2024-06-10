import PropTypes from 'prop-types'

const ProfileDisplay = ({firstName, lastName, username, phoneNum, email}) => {
    return (
        <div className="flex flex-col items-center">
            <div className="avatar mb-4">
                <div className="w-48 rounded-full ring ring-stone-400 ring-offset-base-100 ring-offset-2">
                    <img src="images/tree_of_life_avatar_pic.jpeg" alt="profile" />
                </div>
            </div>
            <h1 className="text-5xl font-bold font-serif p-4">
                {firstName} {lastName}
            </h1>
            <div className="flex p-4 flex-row">
                <div className="p-4 border-e-2 border-black">
                    <div className="badge badge-lg bg-stone-300 text-black shadow-md p-4">
                        <h2 className="text-xl">
                            {phoneNum}
                        </h2>
                    </div>
                </div>
                <div className="p-4  border-e-2 border-black">
                    <div className="badge badge-lg bg-stone-300 text-black shadow-md p-4">
                        <h2 className="text-xl">
                            {username}
                        </h2>
                    </div>
                </div>
                <div className="p-4">
                    <div className="badge badge-lg bg-stone-300 text-black shadow-md p-4">
                        <h2 className="text-xl">
                            {email}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
};

ProfileDisplay.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    phoneNum: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
}

export default ProfileDisplay;