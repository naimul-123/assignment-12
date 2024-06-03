// import Swiper core and required modules
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/bundle';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Slide from './Slide';

const Banner = () => {
    const axiosPublic = useAxiosPublic()
    const { data: sliderData = [] } = useQuery({
        queryKey: ['sliderData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/slides')
            return res.data;
        }
    })



    return (
        <div className='relative'>
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


            <div className="card max-w-screen-sm mx-auto bg-gradient-to-r from-green-200 to-green-50 lg:absolute lg:left-1/2 lg:bottom-0 lg:transform lg:-translate-x-1/2   z-10  shadow-lg">
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-4xl font-bold text-green-500">Up to 12% Off on first order</h2>
                    <p>Use code: <span className="font-bold text-lg">FA1254A</span></p>
                    <div className="card-actions justify-end">
                        <button className="btn bg-green-500 hover:bg-inherit hover:text-green-500 text-lg font-bold  text-white btn-outline">Order Now</button>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Banner;