import React, { useContext } from "react";
import {
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonTitle,
  IonCardContent,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonText,
} from "@ionic/react";
import { AppContext } from "../AppContext";

interface Props {
  login: () => void;
  signup: () => void;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
}

const Login: React.FC<Props> = (props) => {
  const { error } = useContext(AppContext);
  return (
    <IonPage className="display-flex login-page">
      <IonCard className="login-card">
        <IonCardHeader>
          <IonTitle className="login-title">Tome</IonTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol className="error-col">
                <IonText className="error-text-white">{error}</IonText>
              </IonCol>
            </IonRow>
            <IonRow className="login-username-row">
              <IonCol>
                <IonItem>
                  <IonInput
                    type="text"
                    placeholder="Enter username"
                    onIonChange={(e: any) => props.setUsername(e.target.value)}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="login-password-row">
              <IonCol>
                <IonItem>
                  <IonInput
                    type="password"
                    placeholder="Enter password"
                    onIonChange={(e: any) => props.setPassword(e.target.value)}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="login-button-row">
              <IonCol>
                <IonButton onClick={props.login}>Submit</IonButton>
              </IonCol>
              <IonCol>
                <IonButton onClick={props.signup}>Sign-up</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </IonPage>
  );
};

export default Login;
