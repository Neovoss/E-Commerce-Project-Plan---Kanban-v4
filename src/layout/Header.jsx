import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import {
  Phone,
  Mail,
  User,
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  LogOut,
} from 'lucide-react'
import SocialIcon from '../components/SocialIcons.jsx'
import { logoutUser } from '../store/actions/clientActions.js'
import { gravatarUrl } from '../utils/gravatar.js'
import { categoryPath, GENDER_LABELS } from '../utils/category.js'

const NAV_LINKS = [
  { to: '/', label: 'Home', exact: true },
  { to: '/about', label: 'About' },
  { to: '/team', label: 'Team' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.client.user)
  const categories = useSelector((state) => state.product.categories)
  const [menuOpen, setMenuOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const [avatar, setAvatar] = useState('')

  const isLoggedIn = Boolean(user?.email)

  useEffect(() => {
    if (!user?.email) {
      return undefined
    }
    let cancelled = false
    gravatarUrl(user.email, 40)
      .then((url) => {
        if (!cancelled) {
          setAvatar(url)
        }
      })
      .catch((error) => console.error('Gravatar could not be generated:', error))
    return () => {
      cancelled = true
    }
  }, [user?.email])

  const groupedCategories = Object.entries(GENDER_LABELS).map(([gender, label]) => ({
    gender,
    label,
    items: categories.filter((category) => category.gender === gender),
  }))

  const closeAll = () => {
    setMenuOpen(false)
    setShopOpen(false)
  }

  return (
    <header className="flex flex-col">
      <div className="hidden bg-brand-dark px-6 py-3 text-sm font-bold text-white md:flex md:items-center md:justify-between">
        <div className="flex items-center gap-6">
          <a href="tel:+225550000" className="flex items-center gap-2">
            <Phone size={16} /> (225) 555-0118
          </a>
          <a href="mailto:michelle.rivera@example.com" className="flex items-center gap-2">
            <Mail size={16} /> michelle.rivera@example.com
          </a>
        </div>
        <p>Follow Us and get a chance to win 80% off</p>
        <div className="flex items-center gap-3">
          <span>Follow Us :</span>
          <SocialIcon name="instagram" size={16} />
          <SocialIcon name="youtube" size={16} />
          <SocialIcon name="facebook" size={16} />
          <SocialIcon name="twitter" size={16} />
        </div>
      </div>

      <div className="flex flex-col px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-brand-dark" onClick={closeAll}>
            Bandage
          </Link>
          <button
            type="button"
            className="text-brand-dark md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <nav
          className={`${menuOpen ? 'flex' : 'hidden'} flex-col items-center gap-8 py-8 text-2xl text-brand-muted md:flex md:flex-row md:gap-6 md:py-0 md:text-sm md:font-bold`}
        >
          <NavLink to="/" exact activeClassName="text-brand-dark" onClick={closeAll}>
            Home
          </NavLink>

          <div className="relative flex flex-col items-center">
            <button
              type="button"
              className="flex items-center gap-1"
              onClick={() => setShopOpen((open) => !open)}
              aria-expanded={shopOpen}
            >
              Shop <ChevronDown size={16} />
            </button>

            {shopOpen && (
              <div className="flex flex-col gap-6 py-6 text-base md:absolute md:top-8 md:z-20 md:flex-row md:gap-10 md:rounded md:bg-white md:px-10 md:py-8 md:shadow-lg">
                {groupedCategories.map((group) => (
                  <div key={group.gender} className="flex flex-col items-center gap-3 md:items-start">
                    <h3 className="text-base font-bold text-brand-dark">{group.label}</h3>
                    {group.items.map((category) => (
                      <Link
                        key={category.id}
                        to={categoryPath(category)}
                        className="whitespace-nowrap text-sm font-bold text-brand-muted"
                        onClick={closeAll}
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                ))}
                <Link
                  to="/shop"
                  className="text-sm font-bold text-brand-muted"
                  onClick={closeAll}
                >
                  Tüm Ürünler
                </Link>
              </div>
            )}
          </div>

          {NAV_LINKS.slice(1).map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              activeClassName="text-brand-dark"
              onClick={closeAll}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div
          className={`${menuOpen ? 'flex' : 'hidden'} flex-col items-center gap-6 pb-8 text-brand md:flex md:flex-row md:gap-4 md:pb-0 md:text-sm md:font-bold`}
        >
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              {isLoggedIn && avatar && (
                <img src={avatar} alt={user.name} className="h-8 w-8 rounded-full" />
              )}
              <span className="text-sm font-bold text-brand">{user.name}</span>
              <button
                type="button"
                onClick={() => {
                  dispatch(logoutUser())
                  closeAll()
                }}
                aria-label="Logout"
                className="flex items-center gap-1 text-sm font-bold text-brand-muted"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="flex items-center gap-2" onClick={closeAll}>
                <User size={16} /> Login
              </Link>
              <span>/</span>
              <Link to="/signup" onClick={closeAll}>
                Register
              </Link>
            </div>
          )}
          <button type="button" aria-label="Search">
            <Search size={20} />
          </button>
          <button type="button" aria-label="Shopping cart">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
