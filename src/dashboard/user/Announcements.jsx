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
        <div>
            <div className='space-y-2'>
                {announcements?.map((announcement) =>
                    <div className="card shrink-0 max-w-screen-sm shadow-md bg-stone-200" key={announcement._id}>
                        <div className='card-body flex-row justify-between  items-center' >
                            <div className=''>
                                <h3 className="text-3xl font-bold">{announcement.title}</h3>
                                <p className='text-lg'>{announcement.description}</p>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Announcements;