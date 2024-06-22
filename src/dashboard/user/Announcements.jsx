import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Announcements = () => {
    const axiosPublic = useAxiosPublic();


    const { data: announcements } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosPublic.get('/announcements');
            return res.data;
        }
    })
    return (

        <div className='space-y-2 m-6 flex flex-col  gap-2 justify-center items-center'>
            {announcements?.map((announcement) =>

                <div role="alert" className="alert alert-info shadow-lg" key={announcement._id}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <div>
                        <h3 className="font-bold text-2xl">{announcement.title}</h3>
                        <div className="text-lg">{announcement.description}</div>
                    </div>
                </div>

            )}
        </div>

    );
};

export default Announcements;