import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Slider from '../components/Slider.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Spinner from '../components/Spinner.jsx'
import { heroImages } from '../data/mockData.js'
import { fetchProducts } from '../store/actions/productActions.js'
import { FETCH_STATES } from '../store/actions/actionTypes.js'
import { categoryPath, topCategories } from '../utils/category.js'
import { useTranslation } from '../hooks/useTranslation.js'

export default function HomePage() {
  const dispatch = useDispatch()
  const t = useTranslation()
  const categories = useSelector((state) => state.product.categories)
  const productList = useSelector((state) => state.product.productList)
  const fetchState = useSelector((state) => state.product.fetchState)

  useEffect(() => {
    dispatch(fetchProducts({ limit: 8 }))
  }, [dispatch])

  const slides = [
    {
      id: 1,
      eyebrow: t.home.slide1Eyebrow,
      title: t.home.slide1Title,
      description: t.home.slideDescription,
      cta: t.home.slide1Cta,
      image: heroImages[0],
    },
    {
      id: 2,
      eyebrow: t.home.slide1Eyebrow,
      title: t.home.slide2Title,
      description: t.home.slideDescription,
      cta: t.home.slide2Cta,
      image: heroImages[1],
    },
  ]

  return (
    <div className="flex flex-col">
      <Slider slides={slides} />

      <section className="flex flex-col items-center gap-8 px-6 py-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-2xl font-bold text-brand-dark">{t.home.editorsPick}</h2>
          <p className="text-sm text-brand-muted">{t.home.editorsPickSubtitle}</p>
        </div>
        <div className="flex w-full flex-col gap-4 md:flex-row md:flex-wrap md:justify-center">
          {topCategories(categories).map((category) => (
            <Link
              key={category.id}
              to={categoryPath(category)}
              className="relative flex h-[300px] w-full flex-col justify-end md:h-[500px] md:w-[240px]"
            >
              <img
                src={category.img}
                alt={category.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="relative m-6 flex items-center justify-center bg-white px-10 py-4 text-base font-bold text-brand-dark">
                {category.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center gap-8 bg-brand-light px-6 py-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-xl text-brand-muted">{t.home.featuredProducts}</p>
          <h2 className="text-2xl font-bold text-brand-dark">{t.home.bestsellers}</h2>
          <p className="text-sm text-brand-muted">{t.home.editorsPickSubtitle}</p>
        </div>

        {fetchState === FETCH_STATES.FETCHING ? (
          <Spinner label={t.common.productsLoading} />
        ) : (
          <div className="flex w-full flex-col items-center gap-8 md:flex-row md:flex-wrap md:justify-center">
            {productList.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <Link
          to="/shop"
          className="rounded border border-brand px-10 py-4 text-sm font-bold text-brand"
        >
          {t.home.loadMore}
        </Link>
      </section>

      <section className="flex flex-col items-center gap-8 px-6 py-16 md:flex-row md:justify-center md:gap-16">
        <img
          src="https://picsum.photos/seed/bandage-feature/700/700"
          alt={t.home.featureTitle}
          className="h-[400px] w-full object-cover md:h-[600px] md:w-[500px]"
        />
        <div className="flex flex-col gap-6 md:max-w-md">
          <p className="text-base font-bold text-brand-muted">{t.home.featureEyebrow}</p>
          <h2 className="text-4xl font-bold text-brand-dark">{t.home.featureTitle}</h2>
          <p className="text-xl text-brand-muted">{t.home.featureText}</p>
          <div className="flex flex-col gap-3 md:flex-row">
            <Link
              to="/shop"
              className="rounded bg-brand px-8 py-4 text-center text-sm font-bold text-white"
            >
              {t.home.buyNow}
            </Link>
            <Link
              to="/about"
              className="rounded border border-brand px-8 py-4 text-center text-sm font-bold text-brand"
            >
              {t.home.learnMore}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
