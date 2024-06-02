import React from 'react';
import bgImg from '../../../public/image/sliderImg/slider-1.jpg'
import { FaArrowCircleRight } from 'react-icons/fa';
const AboutBuilding = () => {
    return (
        <div className='my-10  px-4'>
            <div className='text-center space-y-2 my-6'>
                <h2 className="text-4xl font-bold text-center">About our building</h2>
                <p>Here our building information</p>
            </div>
            <div className='shadow-lg rounded-lg'>
                <div className='flex flex-col lg:flex-row gap-6 justify-center items-center  '>
                    <div className='lg:w-1/2'>
                        <img src="/public/image/image (3).webp" className='w-full rounded-t-lg lg:rounded-none lg:rounded-l-lg' alt="" />
                    </div>
                    <div className='lg:w-1/2 space-y-4 flex flex-col justify-between gap-4 p-8 '>
                        <h2 className='text-center text-4xl font-bold text-green-500 '>Building Overview</h2>
                        <ul className='list-disc'>
                            <li className='flex items-center text-base gap-2'> <FaArrowCircleRight className='text-green-600' /> <span className='font-bold text-gray-500'>Building Name:</span>Maplewood Residences.</li>
                            <li className='flex items-center text-base gap-2'> <FaArrowCircleRight className='text-green-600' /> <span className='font-bold text-gray-500'>Address:</span> 789 Elm Street, Springfield, IL 62701.</li>
                            <li className='flex items-center text-base gap-2'> <FaArrowCircleRight className='text-green-600' /> <span className='font-bold text-gray-500'>Construction Year:</span>  Construction Year: 2015.</li>
                            <li className='flex items-center text-base gap-2'> <FaArrowCircleRight className='text-green-600' /> <span className='font-bold text-gray-500'>Number of Floors: </span>12</li>
                            <li className='flex items-center text-base gap-2'> <FaArrowCircleRight className='text-green-600' /> <span className='font-bold text-gray-500'>Number of Units: </span> 150</li>
                            <li className='flex items-center text-base gap-2'> <FaArrowCircleRight className='text-green-600' /> <span className='font-bold text-gray-500'>Building Type:</span> Residential.</li>
                        </ul>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row-reverse gap-6 justify-center items-center  rounded-lg '>
                    <div className='lg:w-1/2'>
                        <img src="/public/image/image (4).webp" className='w-full rounded-t-lg lg:rounded-none lg:rounded-r-lg' alt="" />
                    </div>
                    <div className='lg:w-1/2 space-y-4 flex flex-col justify-between gap-4 p-8 '>
                        <h2 className='text-center text-4xl font-bold text-green-500 '>Building Amenities</h2>
                        <ul className='space-y-1'>
                            <li className='p-2 text-lg'>  <span className='font-bold text-gray-500 inline-flex items-center gap-2'> <FaArrowCircleRight className='text-green-600' /> Elevators:</span>  4 high-speed elevators</li>
                            <li className='p-2 text-lg'>  <span className='font-bold text-gray-500 inline-flex items-center gap-2' ><FaArrowCircleRight className='text-green-600' />Parking:</span> 200 spots (underground garage with electric vehicle charging stations)</li>
                            <li className='p-2 text-lg'>  <span className='font-bold text-gray-500 inline-flex items-center gap-2' ><FaArrowCircleRight className='text-green-600' />Security:</span>  24/7 CCTV surveillance, biometric access control systems, on-site security personnel</li>
                            <li className='p-2 text-lg'>  <span className='font-bold text-gray-500 inline-flex items-center gap-2' ><FaArrowCircleRight className='text-green-600' />Recreational Facilities: </span>Indoor swimming pool, state-of-the-art fitness center, rooftop garden with BBQ area, community lounge with free Wi-Fi</li>
                            <li className='p-2 text-lg'>  <span className='font-bold text-gray-500 inline-flex items-center gap-2' ><FaArrowCircleRight className='text-green-600' />Laundry Facilities: </span> In-unit washers and dryers in every apartment, additional common laundry area on the ground floor</li>
                            <li className='p-2 text-lg'>  <span className='font-bold text-gray-500 inline-flex items-center gap-2' ><FaArrowCircleRight className='text-green-600' />Pet Policy:</span> Pets allowed (up to 2 pets per unit, breed restrictions apply)</li>
                        </ul>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-6 justify-center items-center  rounded-lg '>
                    <div className='lg:w-1/2'>
                        <img src="/public/image/image (1).webp" className='w-full rounded-t-lg lg:rounded-none lg:rounded-r-lg' alt="" />
                    </div>
                    <div className='lg:w-1/2 space-y-4 flex flex-col justify-between gap-4 p-8 '>
                        <h2 className='text-center text-4xl font-bold text-green-500 '>Unit Details</h2>
                        <ul className='space-y-1'>
                            <li className='p-2 text-lg'>  <span className='font-bold text-gray-500 inline-flex items-center gap-2'> <FaArrowCircleRight className='text-green-600' />  Unit Types:</span>  Studio, 1-Bedroom, 2-Bedroom, Penthouse</li>
                            <li className='p-2 text-lg'>  <span className='font-bold text-gray-500 inline-flex items-center gap-2' ><FaArrowCircleRight className='text-green-600' />Unit Sizes:</span> 450-1500 sq. ft.</li>
                            <li className='p-2 text-lg'>  <span className='font-bold text-gray-500 inline-flex items-center gap-2' ><FaArrowCircleRight className='text-green-600' />Unit Features:</span>  Private balconies, stainless steel kitchen appliances, granite countertops, hardwood floors, central air conditioning and heating</li>
                            <li className='p-2 text-lg'>  <span className='font-bold text-gray-500 inline-flex items-center gap-2' ><FaArrowCircleRight className='text-green-600' />Floor Plans: </span>View Floor Plans</li>
                        </ul>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default AboutBuilding;