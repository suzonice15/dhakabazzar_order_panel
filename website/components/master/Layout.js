// import custom components
import Footer from "./Footer";
import Header from "./Header";
 export default function Layout({ children }) {
  
  return (
    <>
      <Header />
      <main  style={{background:"#f2f2f2"}}>
       {children} 
      </main>
      <Footer />
    </>
  );
}
