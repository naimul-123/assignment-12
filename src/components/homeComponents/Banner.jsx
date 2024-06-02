// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/bundle';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Slide from './Slide';

const Banner = () => {
    const axiosPublic = useAxiosPublic()
    const { data: sliderData } = useQuery({
        queryKey: ['sliderData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/slides')
            return res.data;
        }
    })

    console.log(sliderData)

    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            {sliderData.map(slide => <SwiperSlide key={slide._id}>
                <Slide slide={slide} />
            </SwiperSlide>)}


            ...
        </Swiper>
    );
};

export default Banner;