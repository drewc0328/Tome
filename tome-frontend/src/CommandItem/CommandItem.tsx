import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonText,
  IonIcon,
  IonTitle,
  IonToast,
} from "@ionic/react";
import { Command } from "../Models/Command";

import {
  ellipsisVerticalOutline,
  trashOutline,
  copyOutline,
  pencilOutline,
} from "ionicons/icons";

interface Props {
  command: Command;
  deleteCommand: () => void;
  setOpenEditModal: (value: boolean) => void;
}

const CommandItem: React.FC<Props> = (props) => {
  const [showToast, setShowToast] = useState<boolean>(false);
  return (
    <IonCard className="command-item-card">
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Copied to clipboard!"
        duration={400}
      />
      <IonGrid>
        <IonRow>
          <IonCol size="8">
            <IonGrid>
              <IonRow>
                <IonCol className="command-title-col">
                  <IonTitle className="command-title-text">
                    {props.command.title}
                  </IonTitle>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonGrid>
                    <IonRow>
                      <IonCol className="command-body-col">
                        <IonText className="command-body-text">
                          {props.command.body}
                        </IonText>
                      </IonCol>
                      <IonCol className="command-copy-col">
                        <IonIcon
                          className="command-copy-icon"
                          icon={copyOutline}
                          onClick={() => {
                            navigator.clipboard.writeText(props.command.body);
                            setShowToast(true);
                          }}
                        />
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCol>
          <IonCol className="command-delete-col" size="2">
            <IonIcon
              className="command-delete-icon"
              icon={trashOutline}
              onClick={props.deleteCommand}
            />
          </IonCol>
          <IonCol className="command-edit-col" size="2">
            <IonIcon
              className="command-edit-icon"
              icon={pencilOutline}
              onClick={() => props.setOpenEditModal(true)}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};

export default CommandItem;
