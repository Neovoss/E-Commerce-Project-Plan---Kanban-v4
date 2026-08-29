import SocialIcon from '../components/SocialIcons.jsx'
import { teamMembers } from '../data/mockData.js'
import { useTranslation } from '../hooks/useTranslation.js'

export default function TeamPage() {
  const t = useTranslation()

  return (
    <div className="flex flex-col">
      <section className="flex flex-col items-center gap-3 px-6 py-12 text-center">
        <p className="text-sm font-bold text-brand-muted">{t.team.eyebrow}</p>
        <h1 className="text-4xl font-bold text-brand-dark">{t.team.title}</h1>
      </section>

      <section className="flex flex-col gap-4 px-6 md:flex-row md:justify-center">
        <img
          src="https://picsum.photos/seed/team-hero-1/800/600"
          alt=""
          className="h-[250px] w-full object-cover md:h-[500px] md:w-[500px]"
        />
        <div className="flex flex-col gap-4">
          <img
            src="https://picsum.photos/seed/team-hero-2/500/300"
            alt=""
            className="h-[120px] w-full object-cover md:h-[240px] md:w-[240px]"
          />
          <img
            src="https://picsum.photos/seed/team-hero-3/500/300"
            alt=""
            className="h-[120px] w-full object-cover md:h-[240px] md:w-[240px]"
          />
        </div>
      </section>

      <section className="flex flex-col items-center gap-10 px-6 py-16">
        <h2 className="text-4xl font-bold text-brand-dark">{t.team.meetTeam}</h2>
        <div className="flex w-full flex-col items-center gap-10 md:flex-row md:flex-wrap md:justify-center">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center gap-3">
              <img
                src={member.image}
                alt={member.name}
                className="h-[230px] w-[230px] object-cover"
              />
              <h3 className="text-base font-bold text-brand-dark">{member.name}</h3>
              <p className="text-sm font-bold text-brand-muted">{t.team[member.roleKey]}</p>
              <div className="flex items-center gap-5 text-brand">
                <SocialIcon name="facebook" size={20} />
                <SocialIcon name="instagram" size={20} />
                <SocialIcon name="twitter" size={20} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center gap-6 bg-brand-light px-6 py-16 text-center">
        <h2 className="text-4xl font-bold text-brand-dark">{t.team.trialTitle}</h2>
        <p className="max-w-md text-sm text-brand-muted">{t.team.trialText}</p>
        <button type="button" className="rounded bg-brand px-10 py-4 text-sm font-bold text-white">
          {t.team.trialCta}
        </button>
      </section>
    </div>
  )
}
