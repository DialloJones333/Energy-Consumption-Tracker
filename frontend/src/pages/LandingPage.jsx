import Navbar from '../components/Navbar';
import LandingCharts from '../components/LandingCharts';
import Footer from '../components/Footer'
import '../styles/LandingPage.css'

const LandingPage = () => (
    <div className='bg-gray-100'>
        <Navbar />
        <main className="p-10 min-h-screen">
            <section className="text-center mb-10">
                <h1 className="text-6xl font-bold mb-8">EcoEfficient Living</h1>
                <p className="text-gray-700 mb-8 max-w-4xl mx-auto">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis blandit, nisl rutrum maximus eleifend, 
                    nibh libero convallis lacus, eu consequat eros metus sed nunc. Phasellus finibus fringilla erat ut rhoncus. 
                    Quisque iaculis metus et condimentum porta. Maecenas purus odio, fermentum nec cursus eu, feugiat ullamcorper orci. 
                    Nulla fermentum sapien vitae aliquet tempor. Cras ac tempus velit, a euismod erat. Pellentesque elit eros, 
                    auctor scelerisque convallis vitae, elementum id tortor.
                </p>
                <a href='https://github.com/DialloJones333/Energy-Consumption-Tracker' target="_blank" rel="noopener noreferrer">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-green-500">Learn More</button>
                </a> 
            </section>
            <LandingCharts />
        </main>
        <Footer />
    </div>
);

export default LandingPage;