import React from "react";
import Footer from "../components/footer";

function Index({ children }) {
  return (
    <div className="flex flex-col justify-between max-w-6xl min-h-screen">
      <div className="sm:pt-0">{children}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Index;
