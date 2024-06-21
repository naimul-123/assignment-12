import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const MakeAnnouncement = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();


    const { data: announcements, refetch } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosPublic.get('/announcements');
            return res.data;
        }
    })


    const handleAnnouncement = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const announcementInfo = {
            title, description
        }

        const res = await axiosSecure.post('/makeAnnounce', { announcementInfo })

        if (res.data.acknowledged) {
            refetch();
            e.target.reset();
            Swal.fire({
                title: "Succeeded!",
                text: "Announcement added successfully.",
                icon: "success",
                timer: 1500,
            });

        }
    }
    const handleRemove = async (id) => {

        const res = await axiosSecure.delete(`/announcements/${id}`);
        if (res.data.deletedCount) {
            refetch();

            Swal.fire({
                title: "Deleted!",
                text: "Announcement has been deleted successfully.",
                icon: "success",
                timer: 1500,
            });
        }
    }
    return (
        <div className='max-w-screen-sm m-4 space-y-2'>
            <div className="card shrink-0 w-full shadow-lg my-6 bg-base-100">
                <form className="card-body" onSubmit={handleAnnouncement}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input type="text" name='title' placeholder="Announcement title" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input type="text" name='description' placeholder="Description" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>

            <div className='space-y-2'>
                {announcements?.map((announcement) =>
                    <div className="card shrink-0 max-w-screen-sm shadow-md bg-stone-200" key={announcement._id}>
                        <div className='card-body flex-row justify-between  items-center' >
                            <div className=''>
                                <h3 className="text-3xl font-bold">{announcement.title}</h3>
                                <p className='text-lg'>{announcement.description}</p>
                            </div>
                            <div className='card-actions'>
                                <button className="btn btn-secondary  btn-sm" onClick={() => handleRemove(announcement._id)}>Remove</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MakeAnnouncement;