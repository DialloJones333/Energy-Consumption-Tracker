import Navbar from '../components/Navbar';
import ChangePasswordForm from '../components/Forms/ChangePasswordForm';
import Footer from '../components/Footer';

const ChangePassword = () => {
    return (
        <div className='flex flex-col min-h-screen p-5'>
            <Navbar />
            <div className="flex flex-grow items-center justify-center p-10">
                <ChangePasswordForm />
            </div>
            <Footer />
        </div>
    );
};

export default ChangePassword;