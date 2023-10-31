import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Auth/Login";
import SidebarWithHeader from "./components/SidebarWithHeader/SidebarWithHeader";
import HomeDashboard from "./components/Dash/Home";
import Article from "./components/UserManagment/UsersTable";

import TabsSalesPerson from "./components/he/TabsSalesPerson";
import UpdatePerson from "./components/he/UpdatePerson";
import MakingChargesTable from "./components/makingcharges/makingCharges";
import PremiumCharges from "./components/Premium/premium";

function App() {
  const [initialLoad, setInitialLoad] = useState(true);
  const [loggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  });
  useEffect(() => {
    setLoggedIn(() => {
      const token = localStorage.getItem("token");
      return token ? true : false;
    });
    setTimeout(() => {
      setInitialLoad((prev) => false);
    }, 1000);
    console.log("loggedIn:", loggedIn);
  }, [loggedIn]);

  return (
    <>
      {initialLoad ? (
        <>Loading...</>
      ) : (
        <>
          {loggedIn ? (
            <SidebarWithHeader setLoggedIn={setLoggedIn}>
              <Routes>
                {loggedIn ? (
                  <>
                    <Route path="/" element={<HomeDashboard />} />
                    <Route path="/articles" element={<Article />} />
                    <Route path="/category" element={<TabsSalesPerson />} />
                    <Route path="/Backup" element={<PremiumCharges />} />
                    <Route path="/singlearticle" element={<UpdatePerson />} />

                    <Route
                      path="/addcategory"
                      element={<MakingChargesTable />}
                    />
                  </>
                ) : (
                  <>
                    <Route
                      path="*"
                      element={<Login setLoggedIn={setLoggedIn} />}
                    />{" "}
                  </>
                )}
              </Routes>
            </SidebarWithHeader>
          ) : (
            <Routes>
              <Route path="*" element={<Login setLoggedIn={setLoggedIn} />} />
            </Routes>
          )}
        </>
      )}
    </>
  );
}

export default App;
