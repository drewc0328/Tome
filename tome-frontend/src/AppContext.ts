import { createContext } from "react";
import User from "./Models/User";
import { Command, Tag, Search } from "./Models/Command";

interface AppContextData {
  user: User;
  setUser: (user: User) => void;
  commands: Command[];
  setCommands: (commands: Command[]) => void;
  tag: string;
  setTag: (tag: string) => void;
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
  error: string;
  setError: (error: string) => void;
}

export const UserDefaultValue: User = {
  id: 0,
  username: "",
};

export const CommandsDefaultValue: Command[] = [
  {
    id: 0,
    uid: 0,
    title: "",
    body: "",
    tag: "",
  },
];

export const TagsDefaultValue: Tag[] = [
  {
    tag: "",
  },
];

const AppContextDefaultValue: AppContextData = {
  user: UserDefaultValue,
  setUser: (user: User) => null,
  commands: CommandsDefaultValue,
  setCommands: (commands: Command[]) => null,
  tag: "",
  setTag: (tag: string) => null,
  tags: TagsDefaultValue,
  setTags: (tag: Tag[]) => null,
  error: "",
  setError: (error: string) => null,
};

export const AppContext = createContext<AppContextData>(AppContextDefaultValue);
