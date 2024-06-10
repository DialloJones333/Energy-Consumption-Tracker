import LandingNavbar from '../components/LandingNavbar';
import Footer from '../components/Footer';
import SignUpForm from '../components/Forms/SignUpForm';

const SignUp = () => {
    return (
        <div className='flex flex-col min-h-screen font-serif'>
            <LandingNavbar />
            <div className='flex flex-grow items-center justify-center p-10'>
                <SignUpForm />
            </div>
            <Footer />
        </div>
    );
};

export default SignUp;