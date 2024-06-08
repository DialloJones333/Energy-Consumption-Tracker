

const AccountPrefDisplay = () => {
    return (
        <div className="stats stats-vertical h-full w-full bg-inherit text-slate-800">
                <div className="stat shadow relative">
                    <div className="stat-value text-3xl">Allow notifications via text</div>
                    <div className="stat-desc text-slate-800">Want to receive text messages?</div>
                    <span className="absolute top-16 right-5 badge badge-lg p-4 text-xl badge-success shadow-md">True</span>
                </div>
            <div className="stat shadow relative">
                <div className="stat-value text-3xl">Allow notifications via email</div>
                <div className="stat-desc text-slate-800">Want to receive emails?</div>
                <span className="absolute top-16 right-5 badge badge-lg p-4 text-xl badge-success shadow-md">True</span>
            </div>
            <div className="stat relative">
                <div className="stat-value text-3xl">Disable all notifications</div>
                <div className="stat-desc text-slate-800">Want to disable texts, emails, and on-site notifications?</div>
                <span className="absolute top-16 right-5 badge badge-lg p-4 text-xl badge-error shadow-md">False</span>
            </div>
        </div>
    )
}

export default AccountPrefDisplay;