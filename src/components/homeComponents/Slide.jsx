import React from 'react';

const Slide = ({ slide }) => {
    const { name, image, description } = slide;
    return (
        <div className="hero min-h-[60vh]" style={{ backgroundImage: `url(${image})` }}>

            <div className="hero-content text-center text-white ">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">{name}</h1>
                    <p className="mb-5">{description}</p>

                </div>
            </div>
        </div>
    );
};

export default Slide;