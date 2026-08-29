import { Route, Switch } from 'react-router-dom'
import HomePage from '../pages/HomePage.jsx'
import ShopPage from '../pages/ShopPage.jsx'
import ProductDetailPage from '../pages/ProductDetailPage.jsx'
import ContactPage from '../pages/ContactPage.jsx'
import TeamPage from '../pages/TeamPage.jsx'
import AboutUsPage from '../pages/AboutUsPage.jsx'
import SignUpPage from '../pages/SignUpPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'

// Layout pattern: tüm sayfa componentleri ve routing tanımları burada toplanıyor
export default function PageContent() {
  return (
    <main className="flex flex-1 flex-col">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route
          exact
          path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
          component={ProductDetailPage}
        />
        <Route exact path="/shop/:gender/:categoryName/:categoryId" component={ShopPage} />
        <Route exact path="/product/:productId" component={ProductDetailPage} />
        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/team" component={TeamPage} />
        <Route exact path="/about" component={AboutUsPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </main>
  )
}
