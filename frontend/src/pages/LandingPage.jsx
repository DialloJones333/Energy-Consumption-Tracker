import Navbar from '../components/Navbar';
import LandingCharts from '../components/LandingCharts';
import '../styles/LandingPage.css'

const LandingPage = () => (
    <div className=' bg-gray-100'>
        <Navbar />
        <main className="p-10">
            <section className="text-center mb-10">
                <h1 className="text-6xl font-bold mb-8">EcoEfficient Living</h1>
                <p className="text-gray-700 mb-8 max-w-4xl mx-auto">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis blandit, nisl rutrum maximus eleifend, 
                    nibh libero convallis lacus, eu consequat eros metus sed nunc. Phasellus finibus fringilla erat ut rhoncus. 
                    Quisque iaculis metus et condimentum porta. Maecenas purus odio, fermentum nec cursus eu, feugiat ullamcorper orci. 
                    Nulla fermentum sapien vitae aliquet tempor. Cras ac tempus velit, a euismod erat. Pellentesque elit eros, 
                    auctor scelerisque convallis vitae, elementum id tortor.
                </p>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-green-500">Learn More</button>
            </section>
            <LandingCharts />
        </main>
        <footer>
            
        </footer>
    </div>
);

export default LandingPage;