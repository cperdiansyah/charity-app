import { Inter, Poppins } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
})

// styles
import './globals.css'
import '../../public/css/bootstrap.min.css'
import '../../public/css/font-awesome.min.css'
import '../../public/css/xsIcon.css'
import '../../public/css/isotope.css'
import '../../public/css/magnific-popup.css'
import '../../public/css/owl.carousel.min.css'
import '../../public/css/owl.theme.default.min.css'
import '../../public/css/animate.css'
import '../../public/css/plugins.css'
import '../../public/css/style.css'
import '../../public/css/responsive.css'
import Header from 'components/organisms/Header'
import Footer from 'components/organisms/Footer'

export const metadata = {
  title: 'Amalkita',
  description:
    'Amalkita is a fundraising web app that allows users to create fundraising campaigns for any cause. Amalkita provides a variety of features to help users raise money, including a donation form, a peer-to-peer fundraising platform, a crowdfunding platform, and a social media integration. Amalkita is the perfect platform for anyone who wants to raise money for a good cause.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <body className={poppins.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
