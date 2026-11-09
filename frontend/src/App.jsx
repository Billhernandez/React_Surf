import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Packages from "./components/Packages.jsx";
import Restaurant from "./components/Restaurant.jsx";
import About from "./components/About.jsx";
import Gallery from "./components/Gallery.jsx";
import Reservation from "./components/Reservation.jsx";
import Footer from "./components/Footer.jsx";
import { getHours, getMenu, getPackages } from "./api.js";

const CONNECTION_ERROR =
  "No pudimos cargar la información. Inicia el servidor con npm run dev y vuelve a intentarlo.";

const fetchContent = () => Promise.all([getPackages(), getMenu(), getHours()]);

export default function App() {
  const [packages, setPackages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hours, setHours] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selection, setSelection] = useState({ packageId: "", key: 0 });

  useEffect(() => {
    let active = true;

    fetchContent()
      .then(([packagesData, menuData, hoursData]) => {
        if (!active) return;
        setPackages(packagesData.packages);
        setCategories(menuData.categories);
        setHours(hoursData);
        setError("");
      })
      .catch(() => {
        if (active) setError(CONNECTION_ERROR);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const reload = () => {
    setLoading(true);
    setError("");
    fetchContent()
      .then(([packagesData, menuData, hoursData]) => {
        setPackages(packagesData.packages);
        setCategories(menuData.categories);
        setHours(hoursData);
        setError("");
      })
      .catch(() => setError(CONNECTION_ERROR))
      .finally(() => setLoading(false));
  };

  const choosePackage = (id) => {
    setSelection((prev) => ({ packageId: id, key: prev.key + 1 }));
    document.getElementById("reservar")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <Restaurant categories={categories} loading={loading} error={error} />
        <Packages
          packages={packages}
          loading={loading}
          error={error}
          onReload={reload}
          onChoose={choosePackage}
        />
        
        <About />
        <Gallery />
        <Reservation
          key={selection.key}
          packages={packages}
          hours={hours}
          selectedPackage={selection.packageId}
        />
      </main>
      <Footer hours={hours} />
    </>
  );
}
