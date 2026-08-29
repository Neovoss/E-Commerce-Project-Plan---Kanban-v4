import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight, LayoutGrid, List } from 'lucide-react'
import ProductCard from '../components/ProductCard.jsx'
import Spinner from '../components/Spinner.jsx'
import { fetchProducts, setFilter, setOffset } from '../store/actions/productActions.js'
import { FETCH_STATES } from '../store/actions/actionTypes.js'
import { categoryPath, topCategories } from '../utils/category.js'

const SORT_OPTIONS = [
  { value: '', label: 'Popularity' },
  { value: 'price:asc', label: 'Price: Low to High' },
  { value: 'price:desc', label: 'Price: High to Low' },
  { value: 'rating:asc', label: 'Rating: Low to High' },
  { value: 'rating:desc', label: 'Rating: High to Low' },
]

export default function ShopPage() {
  const dispatch = useDispatch()
  const { categoryId } = useParams()

  const categories = useSelector((state) => state.product.categories)
  const productList = useSelector((state) => state.product.productList)
  const total = useSelector((state) => state.product.total)
  const limit = useSelector((state) => state.product.limit)
  const offset = useSelector((state) => state.product.offset)
  const filter = useSelector((state) => state.product.filter)
  const fetchState = useSelector((state) => state.product.fetchState)

  // Form alanlari lokal tutuluyor; "Filter" butonuna basilinca state'e islenip istek atiliyor
  const [filterInput, setFilterInput] = useState(filter)
  const [sort, setSort] = useState('')
  const [sortInput, setSortInput] = useState('')

  const activeCategory = categories.find((item) => String(item.id) === String(categoryId))

  // category, filter veya sort degistiginde yeni istek atiliyor; digerleri korunuyor
  useEffect(() => {
    const params = { limit, offset }
    if (categoryId) {
      params.category = categoryId
    }
    if (filter) {
      params.filter = filter
    }
    if (sort) {
      params.sort = sort
    }
    dispatch(fetchProducts(params))
  }, [dispatch, categoryId, filter, sort, limit, offset])

  const currentPage = Math.floor(offset / limit) + 1
  const pageCount = Math.max(1, Math.ceil(total / limit))
  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1).filter(
    (page) => page === 1 || page === pageCount || Math.abs(page - currentPage) <= 1,
  )

  const goToPage = (page) => {
    const safePage = Math.min(Math.max(page, 1), pageCount)
    dispatch(setOffset((safePage - 1) * limit))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const applyFilters = (event) => {
    event.preventDefault()
    dispatch(setOffset(0))
    dispatch(setFilter(filterInput))
    setSort(sortInput)
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center gap-4 bg-brand-light px-6 py-8 md:flex-row md:justify-between">
        <h1 className="text-2xl font-bold text-brand-dark">
          {activeCategory ? activeCategory.title : 'Shop'}
        </h1>
        <nav className="flex items-center gap-2 text-sm font-bold">
          <Link to="/" className="text-brand-dark">
            Home
          </Link>
          <ChevronRight size={16} className="text-brand-muted" />
          <Link to="/shop" className="text-brand-muted">
            Shop
          </Link>
          {activeCategory && (
            <>
              <ChevronRight size={16} className="text-brand-muted" />
              <span className="text-brand-muted">{activeCategory.title}</span>
            </>
          )}
        </nav>
      </div>

      <section className="flex flex-col gap-4 bg-brand-light px-6 pb-10 md:flex-row md:flex-wrap md:justify-center">
        {topCategories(categories).map((category) => (
          <Link
            key={category.id}
            to={categoryPath(category)}
            className="relative flex h-[220px] w-full items-center justify-center md:w-[220px]"
          >
            <img
              src={category.img}
              alt={category.title}
              className="absolute inset-0 h-full w-full object-cover brightness-50"
            />
            <span className="relative flex flex-col items-center gap-1 text-white">
              <span className="text-base font-bold">{category.title}</span>
              <span className="text-sm">{Number(category.rating ?? 0).toFixed(2)} puan</span>
            </span>
          </Link>
        ))}
      </section>

      <section className="flex flex-col items-center gap-6 px-6 py-10">
        <div className="flex w-full flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="text-sm font-bold text-brand-muted">
            Showing {productList.length} of {total} results
          </p>
          <div className="flex items-center gap-3 text-brand-muted">
            <span className="text-sm font-bold">Views:</span>
            <button type="button" aria-label="Grid view" className="border p-2">
              <LayoutGrid size={16} />
            </button>
            <button type="button" aria-label="List view" className="border p-2">
              <List size={16} />
            </button>
          </div>

          <form className="flex items-center gap-3" onSubmit={applyFilters}>
            <input
              type="text"
              aria-label="Filter"
              placeholder="Ürün ara..."
              value={filterInput}
              onChange={(event) => setFilterInput(event.target.value)}
              className="rounded border border-gray-200 bg-brand-light px-4 py-2 text-sm text-brand-muted"
            />
            <select
              aria-label="Sort"
              value={sortInput}
              onChange={(event) => setSortInput(event.target.value)}
              className="rounded border border-gray-200 bg-brand-light px-4 py-2 text-sm text-brand-muted"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button type="submit" className="rounded bg-brand px-6 py-2 text-sm font-bold text-white">
              Filter
            </button>
          </form>
        </div>

        {fetchState === FETCH_STATES.FETCHING && <Spinner label="Ürünler yükleniyor..." />}

        {fetchState === FETCH_STATES.FAILED && (
          <p className="py-16 text-sm font-bold text-brand-danger">
            Ürünler yüklenemedi, lütfen sayfayı yenileyin.
          </p>
        )}

        {fetchState === FETCH_STATES.FETCHED && productList.length === 0 && (
          <p className="py-16 text-sm font-bold text-brand-muted">
            Aramanızla eşleşen ürün bulunamadı.
          </p>
        )}

        {fetchState === FETCH_STATES.FETCHED && productList.length > 0 && (
          <div className="flex w-full flex-col items-center gap-8 md:flex-row md:flex-wrap md:justify-center">
            {productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {pageCount > 1 && (
          <nav className="flex items-center" aria-label="Pagination">
            <button
              type="button"
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="rounded-l border border-gray-200 bg-brand-light px-5 py-4 text-sm font-bold text-brand disabled:text-gray-400"
            >
              First
            </button>
            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                aria-current={page === currentPage ? 'page' : undefined}
                className={`border border-gray-200 px-5 py-4 text-sm font-bold ${
                  page === currentPage ? 'bg-brand text-white' : 'text-brand'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === pageCount}
              className="rounded-r border border-gray-200 px-5 py-4 text-sm font-bold text-brand disabled:text-gray-400"
            >
              Next
            </button>
          </nav>
        )}
      </section>
    </div>
  )
}
