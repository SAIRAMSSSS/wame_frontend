import Layout from '../components/Layout'
import Hero from '../components/Hero'
import ProgramsGrid from '../components/ProgramsGrid'
import ImpactGrid from '../components/ImpactGrid'
import RoleDiagram from '../components/RoleDiagram'

export default function Home() {
  return (
    <Layout>
      <div style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.5)), url(/frisbee-banner.jpg) center/cover' }}>
        <Hero />
      </div>

      <ProgramsGrid />

      <ImpactGrid />

      <RoleDiagram />
    </Layout>
  )
}

