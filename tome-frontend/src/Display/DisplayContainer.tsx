import React, { useEffect, useState, useContext } from "react";
import Display from "./Display";
import CreateCommand from "../CreateCommand/CreateCommand";
import { AppContext } from "../AppContext";

//TODO Context API, useEffect to get user's commands, and command tags
// Filter function callback to get user's commands of that tag. Get it from context, not an API call.
// that can be done each time a command is added, edited, or deleted

// Probably will rework tabs. Instead of each tab rendering a different display, have one display that gets
// passed the current tab as a prop. Then given that tab, use the command context to get all the data that the
// display needs. When data is changed in any way, update the context.
// Once the user switches to a new tab, the current tab is passed to the display which will then get the
// information reflecting the current tab.

const DisplayContainer: React.FC<{}> = () => {
  const { user, setCommands, tag, setTags, setError } = useContext(AppContext);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const getUsersTags = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/commands/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
        }),
      });
      const responseData = await response.json();

      console.log("responseData: ", responseData);

      if (!response.ok) {
        console.log(responseData.message);
      } else {
        setTags(responseData.tags);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllUsersCommands = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/commands/${user.id}`
      );
      const responseData = await response.json();

      if (!response.ok) {
        console.log(responseData.message);
      } else {
        console.log(responseData.result);
        setCommands(responseData.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUsersCommandsByTag = async (tag: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/commands/${user.id}/${tag}`
      );
      const responseData = await response.json();

      console.log("responseData: ", responseData);

      if (!response.ok) {
        console.log(responseData.message);
      } else {
        setCommands(responseData.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createCommand = async (
    title: string,
    body: string,
    currentTag: string
  ) => {
    try {
      const response = await fetch("http://localhost:5000/api/commands/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.id,
          title,
          body,
          tag: currentTag,
        }),
      });
      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.message);
      } else {
        getUsersCommandsByTag(tag);
        getUsersTags();
        setOpenCreateModal(false);
      }
    } catch (err) {
      setError(err);
    }
  };

  const searchCommand = async () => {
    console.log("Search: ", searchInput);
    try {
      const response = await fetch(
        "http://localhost:5000/api/commands/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: user.id,
            search: searchInput,
          }),
        }
      );
      const responseData = await response.json();

      console.log("responseData: ", responseData);

      if (!response.ok) {
        setError(responseData.message);
      } else {
        setCommands(responseData.commands);
        setOpenCreateModal(false);
      }
    } catch (err) {
      setError(err);
    }
  };

  const closeCreateModal = () => {
    setError("");
    setOpenCreateModal(false);
  };

  useEffect(() => {
    // If tab is empty
    getUsersCommandsByTag(tag);
    getUsersTags();
  }, []);
  return (
    <div>
      {openCreateModal && (
        <CreateCommand create={createCommand} close={closeCreateModal} />
      )}
      <Display
        getUsersCommandsByTag={getUsersCommandsByTag}
        setOpenCreateModal={setOpenCreateModal}
        search={searchCommand}
        setSearchInput={setSearchInput}
      />
    </div>
  );
};

export default DisplayContainer;
