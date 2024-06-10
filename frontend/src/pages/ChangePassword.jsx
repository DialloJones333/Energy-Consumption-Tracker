import LandingNavbar from '../components/LandingNavbar';
import ChangePasswordForm from '../components/Forms/ChangePasswordForm';
import Footer from '../components/Footer';

const ChangePassword = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <LandingNavbar />
            <div className="flex flex-grow items-center justify-center p-10">
                <ChangePasswordForm />
            </div>
            <Footer />
        </div>
    );
};

export default ChangePassword;