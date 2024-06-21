// import Swiper core and required modules
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/bundle';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Slide from './Slide';
import { Link } from 'react-router-dom';

const Banner = () => {
    const axiosPublic = useAxiosPublic()
    const { data: sliderData = [] } = useQuery({
        queryKey: ['sliderData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/slides')
            return res.data;
        }
    })

    const { data: cupons = [] } = useQuery({
        queryKey: ["cupons"],
        queryFn: async () => {
            const res = await axiosPublic.get('/activeCupon');
            return res.data;
        }
    })


    return (
        <div className=''>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                {sliderData.map(slide => <SwiperSlide key={slide._id}>
                    <Slide slide={slide} />
                </SwiperSlide>)}
            </Swiper>

            <div className='flex flex-col md:flex-row justify-center items-center gap-2'>
                {cupons.map(cupon =>
                    <div className="card w-96  bg-gradient-to-r from-green-200 to-green-50" key={cupon._id}>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-4xl font-bold text-green-500">Up to {cupon.discount}% Off!</h2>
                            <p>Use code:  <span className="font-bold text-lg">{cupon.cupon_code}</span></p>
                            <p className='text-sm'>{cupon.description}</p>
                            <div className="card-actions justify-end">
                                <Link to="/apartments" className="btn bg-green-500 hover:bg-inherit hover:text-green-500 text-lg font-bold  text-white btn-outline">Book now</Link>
                            </div>
                        </div>
                    </div>
                )}

            </div>


        </div>
    );
};

export default Banner;