import React, { useContext, useState } from "react";
import CommandItem from "./CommandItem";
import { Command } from "../Models/Command";
import { AppContext } from "../AppContext";
import EditCommand from "../EditCommand/EditCommand";

interface Props {
  command: Command;
}

const CommandItemContainer: React.FC<Props> = (props) => {
  const { user, tag, tags, setTags, setCommands, setError } = useContext(
    AppContext
  );
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
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

  const deleteCommand = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/commands/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.command.id,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.log(responseData.message);
      } else {
        getUsersTags();
        getUsersCommandsByTag(tag);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const editCommand = async (
    title: string,
    body: string,
    currentTag: string
  ) => {
    try {
      const response = await fetch("http://localhost:5000/api/commands/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.command.id,
          title,
          body,
          tag: currentTag,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.message);
      } else {
        getUsersTags();
        getUsersCommandsByTag(tag);
        setOpenEditModal(false);
      }
    } catch (err) {
      setError(err);
    }
  };

  const closeEditModal = () => {
    setOpenEditModal(false);
    setError("");
  };

  return (
    <div>
      {openEditModal && (
        <EditCommand
          close={closeEditModal}
          edit={editCommand}
          command={props.command}
        />
      )}
      <CommandItem
        command={props.command}
        deleteCommand={deleteCommand}
        setOpenEditModal={setOpenEditModal}
      />
    </div>
  );
};

export default CommandItemContainer;
