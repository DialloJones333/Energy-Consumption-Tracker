import LandingNavbar from '../components/LandingNavbar';
import Footer from '../components/Footer';
import LoginForm from '../components/Forms/LoginForm';

// Component to render the Login page
const Login = () => {
    return (
        <div className='flex flex-col min-h-screen font-serif'>
            <LandingNavbar />
            <div className="flex flex-grow items-center justify-center p-10">
                <LoginForm />
            </div>
            <Footer />
        </div>
    );
};

export default Login;