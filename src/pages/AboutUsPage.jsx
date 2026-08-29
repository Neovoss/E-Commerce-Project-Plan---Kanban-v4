import { Link } from 'react-router-dom'

const STATS = [
  { id: 1, value: '15K', label: 'Happy Customers' },
  { id: 2, value: '150K', label: 'Monthly Visitors' },
  { id: 3, value: '15', label: 'Countries Worldwide' },
  { id: 4, value: '100+', label: 'Top Partners' },
]

export default function AboutUsPage() {
  return (
    <div className="flex flex-col">
      <section className="flex flex-col items-center gap-8 px-6 py-16 md:flex-row md:justify-center md:gap-20">
        <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
          <p className="text-sm font-bold text-brand-dark">ABOUT COMPANY</p>
          <h1 className="text-4xl font-bold text-brand-dark md:text-6xl">ABOUT US</h1>
          <p className="max-w-md text-xl text-brand-muted">
            We know how large objects will act, but things on a small scale.
          </p>
          <Link to="/shop" className="rounded bg-brand px-10 py-4 text-sm font-bold text-white">
            Get Quote Now
          </Link>
        </div>
        <img
          src="https://picsum.photos/seed/about-hero/600/600"
          alt="About us"
          className="h-[350px] w-full object-cover md:h-[500px] md:w-[450px]"
        />
      </section>

      <section className="flex flex-col gap-8 px-6 py-10 md:flex-row md:justify-center">
        <div className="flex flex-col gap-4 md:max-w-xs">
          <p className="text-sm font-bold text-brand-muted">Problems trying</p>
          <h2 className="text-2xl font-bold text-brand-dark">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
          </h2>
        </div>
        <p className="text-sm text-brand-muted md:max-w-md">
          Problems trying to resolve the conflict between the two major realms of Classical physics:
          Newtonian mechanics.
        </p>
      </section>

      <section className="flex flex-col items-center gap-10 px-6 py-16 md:flex-row md:justify-center">
        {STATS.map((stat) => (
          <div key={stat.id} className="flex flex-col items-center gap-2">
            <p className="text-5xl font-bold text-brand-dark">{stat.value}</p>
            <p className="text-base font-bold text-brand-muted">{stat.label}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
