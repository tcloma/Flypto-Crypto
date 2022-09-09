import Header from "./sub-components/Header";
import Footer from "./sub-components/Footer";
import '../styles/Layout.scss'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>

  )
}
export default Layout;