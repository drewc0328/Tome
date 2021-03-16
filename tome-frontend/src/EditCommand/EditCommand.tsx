import React, { useState, useContext } from "react";
import {
  IonContent,
  IonModal,
  IonCard,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonButton,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonText,
} from "@ionic/react";
import { Command } from "../Models/Command";
import { AppContext } from "../AppContext";

interface Props {
  close: () => void;
  edit: (title: string, body: string, tag: string) => void;
  command: Command;
}

const EditCommand: React.FC<Props> = (props) => {
  const { tags, error } = useContext(AppContext);
  const [title, setTitle] = useState<string>(props.command.title);
  const [body, setBody] = useState<string>(props.command.body);
  const [currentTag, setCurrentTag] = useState<string>(props.command.tag);
  const [submitTag, setSubmitTag] = useState<string>(props.command.tag);

  return (
    <IonContent>
      {console.log("command: ", props.command)}
      <IonModal isOpen={true}>
        <IonGrid>
          <IonRow className="create-command-main-title-row">
            <IonCol>
              <IonTitle>Edit Command</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="error-col">
              <IonText className="error-text">{error}</IonText>
            </IonCol>
          </IonRow>
          <IonRow className="create-command-title-row">
            <IonCol>
              <IonItem>
                <IonInput
                  type="text"
                  value={title}
                  placeholder="Enter Title"
                  onIonChange={(e: any) => setTitle(e.target.value)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="create-command-body-row">
            <IonCol>
              <IonItem>
                <IonInput
                  type="text"
                  value={body}
                  placeholder="Enter Command"
                  onIonChange={(e: any) => setBody(e.target.value)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="create-command-tag-row">
            <IonCol>
              <IonItem className="create-command-filter-item">
                <IonLabel>
                  <IonTitle>Filter</IonTitle>
                </IonLabel>
                <IonSelect
                  interface="popover"
                  placeholder="Select one"
                  value={currentTag}
                  onIonChange={(e: any) => {
                    setCurrentTag(e.detail.value);
                    setSubmitTag(e.detail.value);
                  }}
                >
                  {tags.length > 0 &&
                    tags.map((tag) => (
                      <div key={tag.tag}>
                        <IonSelectOption>{tag.tag}</IonSelectOption>
                      </div>
                    ))}
                  <IonSelectOption>New Tag</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              {currentTag === "New Tag" && (
                <IonItem>
                  <IonInput
                    type="text"
                    placeholder="Tag Name"
                    onIonChange={(e: any) => setSubmitTag(e.target.value)}
                  />
                </IonItem>
              )}
            </IonCol>
          </IonRow>
          <IonRow className="create-command-button-row">
            <IonCol>
              <IonButton onClick={() => props.edit(title, body, submitTag)}>
                Submit
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton onClick={props.close}>Cancel</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonModal>
    </IonContent>
  );
};

export default EditCommand;
