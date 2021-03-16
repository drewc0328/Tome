import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import {
  IonPage,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonInput,
  IonLabel,
  IonCardContent,
  IonIcon,
  IonButton,
} from "@ionic/react";

import { searchOutline, createOutline } from "ionicons/icons";
import CommandItem from "../CommandItem/CommandItemContainer";

interface Props {
  getUsersCommandsByTag: (tag: string) => void;
  setOpenCreateModal: (value: boolean) => void;
  search: () => void;
  setSearchInput: (value: string) => void;
}

const Display: React.FC<Props> = (props) => {
  const { user, commands, tags, setTag } = useContext(AppContext);
  return (
    <div className="display-flex">
      <IonCard className="main-card">
        <IonCardHeader className="main-card-header">
          <IonGrid>
            <IonRow>
              <IonCol size="5">
                <IonItem className="main-filter-item">
                  <IonLabel>
                    <IonTitle>Filter</IonTitle>
                  </IonLabel>
                  <IonSelect
                    interface="popover"
                    placeholder="All"
                    onIonChange={(e: any) => {
                      setTag(e.detail.value);
                      props.getUsersCommandsByTag(e.detail.value);
                    }}
                  >
                    <IonSelectOption value="">All</IonSelectOption>
                    {tags.length > 0 &&
                      tags.map((tag) => (
                        <div key={tag.tag}>
                          <IonSelectOption>{tag.tag}</IonSelectOption>
                        </div>
                      ))}
                  </IonSelect>
                </IonItem>
              </IonCol>
              <IonCol size="2">
                <abbr title="Create Command">
                  <IonButton
                    color="secondary"
                    onClick={() => props.setOpenCreateModal(true)}
                  >
                    <IonIcon icon={createOutline} />
                  </IonButton>
                </abbr>
              </IonCol>
              <IonCol size="5">
                <IonItem className="main-search-item">
                  <IonInput
                    type="text"
                    placeholder="Search"
                    onIonChange={(e: any) =>
                      props.setSearchInput(e.target.value)
                    }
                    onKeyPress={(e: any) => e.key === "Enter" && props.search()}
                  >
                    <IonIcon className="seach-icon" icon={searchOutline} />
                  </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardHeader>
        <IonCardContent>
          {commands.length > 0 &&
            commands.map((command) => (
              <div key={command.id}>
                <CommandItem command={command} />
              </div>
            ))}
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default Display;
