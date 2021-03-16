import React from "react";
import {
  IonHeader,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from "@ionic/react";

import { logOutOutline } from "ionicons/icons";

interface Props {
  setLogout: (value: boolean) => void;
}

const Header: React.FC<Props> = (props) => {
  return (
    <IonHeader className="header">
      <IonGrid className="header-main-grid">
        <IonRow>
          <IonCol>
            <IonGrid>
              <IonRow>
                <IonCol className="header-logo-col"></IonCol>
                <IonCol className="header-title-col">
                  <IonTitle className="header-title">Tome</IonTitle>
                </IonCol>
                <IonCol className="logout-icon-col">
                  <IonIcon
                    className="logout-icon"
                    icon={logOutOutline}
                    onClick={() => props.setLogout(true)}
                  />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonHeader>
  );
};

export default Header;
