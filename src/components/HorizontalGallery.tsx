import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

const HorizontalGallery = () => {
  const galleryItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop",
      title: "Traditional Agbada - Forest Green",
      alt: "Traditional African Agbada in forest green"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      title: "Ceremonial Buba - Royal Blue",
      alt: "Ceremonial Buba outfit in royal blue"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      title: "Wedding Suit - Burgundy",
      alt: "Custom wedding suit in burgundy"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=600&fit=crop",
      title: "Executive Wear - Charcoal",
      alt: "Executive business wear in charcoal"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1506629905607-632f4ac297e6?w=400&h=600&fit=crop",
      title: "Casual Elegance - Navy",
      alt: "Casual elegant wear in navy"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&h=600&fit=crop",
      title: "Festival Attire - Gold",
      alt: "Festival traditional attire in gold"
    }
  ];

  return (
    <section className="py-16 px-6 lg:px-12 bg-secondary/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-foreground mb-8 text-center">
          Our Signature Collections
        </h2>
        
        <Swiper
          modules={[FreeMode]}
          spaceBetween={20}
          slidesPerView="auto"
          freeMode={true}
          className="gallery-slider"
        >
          {galleryItems.map((item) => (
            <SwiperSlide key={item.id} className="!w-auto">
              <div className="group cursor-pointer">
                <div className="w-64 h-80 rounded-2xl overflow-hidden bg-muted shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="font-inter font-medium text-white text-sm">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HorizontalGallery;