import LandingNavbar from '../components/LandingNavbar';
import LandingCharts from '../components/LandingCharts';

const LandingPage = () => (
    <div className="landing-page">
        <LandingNavbar />
        <main className="p-10">
            <section className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-5">EcoEfficient Living</h1>
            <p className="text-gray-700 mb-5 max-w-4xl mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis blandit, nisl rutrum maximus eleifend, 
                nibh libero convallis lacus, eu consequat eros metus sed nunc. Phasellus finibus fringilla erat ut rhoncus. 
                Quisque iaculis metus et condimentum porta. Maecenas purus odio, fermentum nec cursus eu, feugiat ullamcorper orci. 
                Nulla fermentum sapien vitae aliquet tempor. Cras ac tempus velit, a euismod erat. Pellentesque elit eros, 
                auctor scelerisque convallis vitae, elementum id tortor.
            </p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Learn More</button>
            </section>
            <LandingCharts />
        </main>
    </div>
);

export default LandingPage;