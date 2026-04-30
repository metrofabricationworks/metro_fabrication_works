'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Carousel() {
  const slides = [
    {
      title: "Premium Rolling Shutters",
      desc: "Secure your home and business with high-quality shutters",
      color: "from-blue-700 to-blue-900"
    },
    {
      title: "Custom Gates & Doors",
      desc: "Beautiful and strong designs tailored for you",
      color: "from-emerald-700 to-teal-900"
    },
    {
      title: "Expert Fabrication",
      desc: "Professional welding and metal works in Vijayawada",
      color: "from-amber-700 to-orange-900"
    }
  ];

  return (
    <div className="relative h-[420px] md:h-[520px] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        navigation
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={`h-full bg-gradient-to-r ${slide.color} flex items-center justify-center text-white`}>
              <div className="text-center px-6 max-w-3xl">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl opacity-90">{slide.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}