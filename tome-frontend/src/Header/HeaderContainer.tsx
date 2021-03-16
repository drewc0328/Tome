import React, { useState } from "react";
import Header from "./Header";
import { Redirect } from "react-router-dom";

const HeaderContainer = () => {
  const [logout, setLogout] = useState<boolean>(false);
  return (
    <div>
      {logout && <Redirect to="/login" />}
      <Header setLogout={setLogout} />
    </div>
  );
};

export default HeaderContainer;
