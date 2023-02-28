import Desc from "./components/Desc";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Schedule from "./components/Schedule";
import Speaker from "./components/Speaker";
import Ticket from "./components/Ticket";

function App() {
  return (
    <div>
    <Navigation />
      <div className="container-fluid">
        {/* <!-- Start: Header --> */}
        <Header />
        {/* <!-- End: Header --> */}
      </div>
      <div className="container">
        {/* <!-- Start: Desc --> */}
        <Desc />
        {/* <!-- End: Desc --> */}

        {/* <!-- Start: Speakers --> */}
        <Speaker />

      {/* <!-- Start: Tickets --> */}
      <Ticket />
      {/* <!-- End: Tickets --> */}

      {/* <!-- Start: Schedule --> */}
      <Schedule />
      {/* <!-- End: Schedule --> */}

      {/* <!-- Start: Footer --> */}
      <Footer />
      {/* <!-- End: Footer --> */}
      </div>
      </div>
  );
}

export default App;
