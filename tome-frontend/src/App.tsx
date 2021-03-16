import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";

import Main from "./Main/Main";
import Login from "./Login/LoginContainer";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
// import "@ionic/react/css/padding.css";
// import "@ionic/react/css/float-elements.css";
// import "@ionic/react/css/text-alignment.css";
// import "@ionic/react/css/text-transformation.css";
// import "@ionic/react/css/flex-utils.css";
// import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import User from "./Models/User";
import { Command, Tag } from "./Models/Command";
import {
  AppContext,
  UserDefaultValue,
  CommandsDefaultValue,
  TagsDefaultValue,
} from "./AppContext";

const App: React.FC = () => {
  const [user, setUser] = useState<User>(UserDefaultValue);
  const [commands, setCommands] = useState<Command[]>(CommandsDefaultValue);
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>(TagsDefaultValue);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (user.id === 0) {
      let savedUser = localStorage.getItem("user");
      let currentUser = savedUser !== null ? JSON.parse(savedUser) : savedUser;
      setUser(currentUser);
    } else {
      localStorage.setItem("user", JSON.stringify(user));
    }
  });

  return (
    <IonApp>
      <AppContext.Provider
        value={{
          user,
          setUser,
          commands,
          setCommands,
          tag,
          setTag,
          tags,
          setTags,
          error,
          setError,
        }}
      >
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/app">
              <Main />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Redirect to="/login" />
          </IonRouterOutlet>
        </IonReactRouter>
      </AppContext.Provider>
    </IonApp>
  );
};

export default App;
