import PropTypes from 'prop-types';

const Accordion = ({ tips }) => {
    return (
        <div className="join join-vertical w-full h-full">
            {tips.map((tip, index) => (
                <div key={index} className="collapse collapse-arrow join-item border border-base-300">
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

export default Accordion;