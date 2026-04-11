import Header from '@/app/components/Layout/Header'
import Footer from '@/app/components/Layout/Footer'

type SiteLayoutProps = {
  children: React.ReactNode
}

const SiteLayout = ({ children }: SiteLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default SiteLayout
