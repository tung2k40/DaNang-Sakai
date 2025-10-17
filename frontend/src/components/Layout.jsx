import { useState } from "react";
import Header from "./Header";
import Sidebar from "./sidebars/Sidebar";
import Footer from "./Footer";
import React from "react";

export default function Layout({ children }) {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar onSelect={setSelectedOption} />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 bg-gray-100">
            {children &&
              React.cloneElement(children, {
                selectedOption,
              })}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
