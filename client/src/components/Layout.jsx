import Header from "./sub-components/Header";
import Footer from "./sub-components/Footer";
import '../styles/Layout.scss'

const Layout = ({ children, user, setUser }) => {
   return (
      <>
         <Header user={user} setUser={setUser} />
         <main>{children}</main>
         <Footer />
      </>

   )
}
export default Layout;