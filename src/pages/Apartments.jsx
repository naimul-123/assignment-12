import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { ref } from 'firebase/database';
import Apartment from '../components/apartmentComponents/Apartment';
import { FaAngleLeft } from 'react-icons/fa6';

const Apartments = () => {
    const [currentPage, setCurrentPage] = useState(1)
    // const [totalPage, setTotalPage] = useState(36)
    const axiosPublic = useAxiosPublic();
    const { data = [], refetch, isLoading, isError, error } = useQuery({
        queryKey: ['apartments', currentPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/apartments?page=${currentPage}`)
            return res.data
        },
        keepPreviousData: true

    })
    // useEffect(() => {
    //     refetch();
    // }, [currentPage, refetch])

    // console.log(data)
    if (isLoading && !data) {
        return <div>
            data is loading.....
        </div>
    }
    if (isError) {
        return <div>
            {error.message}
        </div>
    }
    const { apartments, totalPage } = data
    console.log(apartments)
    return (
        <div className='py-16'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
                {
                    apartments?.map((apartment) => <Apartment key={apartment._id} apartment={apartment}></Apartment>)
                }
            </div>
            <div className="join grid grid-cols-5 my-10 max-w-sm">
                <button className="join-item btn btn-outline bg-green-500 text-white hover:bg-green-400 disabled:bg-green-100" onClick={() => setCurrentPage(1)}>First</button>

                <button className="join-item btn btn-outline bg-green-500 text-white hover:bg-green-400 disabled:bg-green-100" disabled={currentPage <= 1} onClick={() => currentPage > 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1)} >Previous</button>
                <p className="join-item btn btn-outline bg-green-500 text-white hover:bg-green-400 disabled:bg-green-100" >{currentPage}</p>
                <button className="join-item btn btn-outline bg-green-500 text-white hover:bg-green-400 disabled:bg-green-100" onClick={() => currentPage < totalPage ? setCurrentPage(currentPage + 1) : setCurrentPage(totalPage)}>Next</button>
                <button className="join-item btn btn-outline bg-green-500 text-white hover:bg-green-400 disabled:bg-green-100" disabled={currentPage >= totalPage} onClick={() => setCurrentPage(totalPage)}>Last</button>
            </div>
        </div >
    );
};

export default Apartments;