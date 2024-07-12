import Navbar from '../components/Navbar';
import ChangePasswordForm from '../components/Forms/ChangePasswordForm';
import Footer from '../components/Footer';

// Component to render the Change Password page
const ChangePassword = () => {
    return (
        <div className='flex flex-col min-h-screen p-5 font-serif'>
            <Navbar />
            <div className="flex flex-grow items-center justify-center p-10">
                <ChangePasswordForm />
            </div>
            <Footer />
        </div>
    );
};

export default ChangePassword;