import LandingNavbar from '../components/LandingNavbar';
import LandingCharts from '../components/LandingCharts';
import Footer from '../components/Footer';
import '../styles/LandingPage.css';

// Component to render the landing page
const LandingPage = () => (
    <div className='flex flex-col min-h-screen font-serif'>
        <LandingNavbar />
        <main className="p-10 flex-grow">
            <section className="text-center mb-10">
                <h1 className="text-6xl font-bold mb-8">EcoEfficient Living</h1>
                <p className="text-slate-800 font-semibold text-2xl mb-8 max-w-4xl mx-auto">
                    Welcome to EcoEfficient Living –
                    a platform designed to empower you with the knowledge and tools to take control of your home energy consumption while reducing 
                    your carbon footprint and saving on energy bills with just a few clicks.
                    <br /><br />
                    I believe that small changes can make a big difference. That&apos;s why i&apos;ve created an intuitive and 
                    powerful web application that brings real-time energy monitoring and detailed historical data analysis to your fingertips. 
                    With this platform, you can easily track your energy usage, identify patterns, and make informed decisions to enhance your energy efficiency.
                    <br /><br />
                    Sign up now to start your journey with EcoEfficient Living and take the first step 
                    towards a more eco-friendly home. But first you can explore the interactive charts below to get a feel of how intuitive and easy it is to 
                    interact with your energy data by simply hovering over the charts.
                </p>
                <a href='https://github.com/DialloJones333/Energy-Consumption-Tracker?tab=readme-ov-file#readme' target="_blank" rel="noopener noreferrer">
                    <button className="bg-stone-400 shadow-lg text-gray-100 font-semibold py-2 px-4 rounded-lg hover:bg-green-500">Learn More</button>
                </a> 
            </section>
            <LandingCharts />
        </main>
        <Footer />
    </div>
);

export default LandingPage;