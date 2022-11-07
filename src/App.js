import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Section from "./components/Section";
function App() {
  return (
    <div>
      <header className="header__wrap">
        <Header />
      </header>
      <section className="section__wrap">
        <Section />
        <Section />
      </section>
      <section className="section__wrap">
        <Section />
        <Section />
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
