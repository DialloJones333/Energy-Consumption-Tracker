import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TabBar from "../components/TabBar";
import AccountPrefDisplay from "../components/AccountPrefDisplay";
import AccountPrefForm from "../components/Forms/AccountPrefForm";
import Footer from "../components/Footer";

const AccountPreferences = () => {
    const [textNoti, setTextNoti] = useState(true);
    const [emailNoti, setEmailNoti] = useState(true);
    const [disableAll, setDisableAll] = useState(false);

    useEffect(() => {
        if (disableAll) {
            setTextNoti(false);
            setEmailNoti(false);
        }
    }, [disableAll]);

    useEffect(() => {
        if (textNoti || emailNoti) {
            setDisableAll(false);
        }
    }, [textNoti, emailNoti]);

    return (
        <div className="min-h-screen flex flex-col p-5">
            <Navbar />
            <section className="w-full border-b-2 border-slate-800 ">
                <div className="flex flex-col ms-4 mt-20">
                    <h1 className="text-6xl font-bold font-serif mb-10">
                        Account Preferences
                    </h1>
                </div>
                <div className="flex justify-center">
                    <TabBar />
                </div>
            </section>
            <main className="flex flex-row flex-grow ms-4 mt-10">
                <div className="flex flex-col gap-10 w-2/4">
                    <div className="h-104 me-8 flex items-center justify-center shadow-2xl rounded-lg font-serif">
                        <AccountPrefDisplay
                            textNoti={textNoti}
                            emailNoti={emailNoti}
                            disableAll={disableAll}
                        />
                    </div>
                </div>
                <div className="flex flex-col me-4 gap-10 mb-10 w-2/4">
                    <div className="h-104 shadow-2xl items-center justify-center flex rounded-lg font-serif">
                        <AccountPrefForm
                            textNoti={textNoti}
                            setTextNoti={setTextNoti}
                            emailNoti={emailNoti}
                            setEmailNoti={setEmailNoti}
                            disableAll={disableAll}
                            setDisableAll={setDisableAll}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default AccountPreferences;