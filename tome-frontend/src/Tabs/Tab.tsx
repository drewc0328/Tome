import React from "react";
import { IonIcon, IonItem, IonTitle } from "@ionic/react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { closeCircleOutline } from "ionicons/icons";
import Display from "../Display/DisplayContainer";
import "react-tabs/style/react-tabs.css";

const TabComponent: React.FC<{}> = () => {
  const tabList = [
    {
      title: "Title 1",
    },
    {
      title: "Title 2",
    },
    {
      title: "Title 3",
    },
    {
      title: "Title 4",
    },
    {
      title: "Title 5",
    },
    {
      title: "Title 6",
    },
    {
      title: "Title 7",
    },
    {
      title: "Title 8",
    },
    {
      title: "Title 9",
    },
    {
      title: "Title 10",
    },
    {
      title: "Title 11",
    },
    {
      title: "Title 12",
    },
    {
      title: "Title 1",
    },
    {
      title: "Title 2",
    },
    {
      title: "Title 3",
    },
    {
      title: "Title 4",
    },
    {
      title: "Title 5",
    },
    {
      title: "Title 6",
    },
    {
      title: "Title 7",
    },
    {
      title: "Title 8",
    },
    {
      title: "Title 9",
    },
    {
      title: "Title 10",
    },
    {
      title: "Title 11",
    },
    {
      title: "Title 12",
    },
  ];

  return (
    <Tabs>
      <TabList>
        <div className="tab-list-div">
          {tabList.map((tab) => (
            <Tab>
              <IonItem className="tab-item">
                <IonTitle>{tab.title}</IonTitle>
                <IonIcon icon={closeCircleOutline} />
              </IonItem>
            </Tab>
          ))}
        </div>
      </TabList>
      {tabList.map((tab) => (
        <TabPanel>
          <Display />
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default TabComponent;
