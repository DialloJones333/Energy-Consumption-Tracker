import PropTypes from 'prop-types';

// Accordion component for displaying tips
const Accordion = ({ tips }) => {
    return (
        <div className="join join-vertical w-full h-full">
            {tips.map((tip) => (
                <div key={tip.id} className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">
                        {tip.title}
                    </div>
                    <div className="collapse-content">
                        <p>{tip.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

Accordion.propTypes = {
    tips: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Accordion;