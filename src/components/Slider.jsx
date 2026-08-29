import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Home Page hero slider'ı: otomatik geçiş + ok tuşları + nokta göstergeleri
export default function Slider({ slides, interval = 6000 }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const goTo = (index) => setActiveIndex((index + slides.length) % slides.length)

  useEffect(() => {
    const timer = setInterval(
      () => setActiveIndex((current) => (current + 1) % slides.length),
      interval,
    )
    return () => clearInterval(timer)
  }, [slides.length, interval])

  const slide = slides[activeIndex]

  return (
    <section className="relative flex flex-col items-center bg-brand text-white md:flex-row md:justify-between md:px-24">
      <button
        type="button"
        onClick={() => goTo(activeIndex - 1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2"
      >
        <ChevronLeft size={40} />
      </button>

      <div className="flex flex-col items-center gap-6 px-6 py-16 text-center md:items-start md:py-32 md:text-left">
        <p className="text-base font-bold">{slide.eyebrow}</p>
        <h1 className="text-4xl font-bold md:text-6xl">{slide.title}</h1>
        <p className="max-w-md text-xl">{slide.description}</p>
        <button
          type="button"
          className="rounded bg-brand-success px-10 py-4 text-2xl font-bold text-white"
        >
          {slide.cta}
        </button>
      </div>

      <img
        src={slide.image}
        alt={slide.title}
        className="h-[400px] w-full object-cover md:h-[650px] md:w-[510px]"
      />

      <button
        type="button"
        onClick={() => goTo(activeIndex + 1)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2"
      >
        <ChevronRight size={40} />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {slides.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Slide ${index + 1}`}
            onClick={() => goTo(index)}
            className={`h-3 w-3 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  )
}
