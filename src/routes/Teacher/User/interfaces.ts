import { DataProxy } from "apollo-cache";

export interface IUserWithContextProps {
  match: {
    params: {
      id: string;
    };
  };
}

export interface IUserWithGraphQlProps extends IUserWithContextProps {
  currentUserId: string;
  accessLevel: number;
}

export interface IUserProps extends IUserWithGraphQlProps {
  getUserInfoQuery: {
    user?: IUser[];
  };
  token: string;
}

export interface IBasicUserInfoProps {
  avatar: string;
  name: string;
  username: string;
  classrooms: IClassroom[];
  studentClassrooms: IClassroom[];
  skills: ISkill[];
  self: boolean;
}

export interface ISkillTagsWithContextProps {
  self: boolean;
  skills: ISkill[];
}

export interface ISkillTagsWithGraphQlProps extends ISkillTagsWithContextProps {
  userId: string;
}

export interface ISkillTagsProps extends ISkillTagsWithGraphQlProps {
  createSkillMutation: (
    options: {
      variables: {
        name: string;
        color: string;
        userId: string;
      };
      update: (
        cache: DataProxy,
        mutationResult: { data: ICreateSkillData }
      ) => void;
    }
  ) => any;
  removeSkillMutation: (
    options: {
      variables: {
        Id: string;
      };
      update: (
        cache: DataProxy,
        mutationResult: { data: { Id: string } }
      ) => void;
    }
  ) => any;
}

export interface IDetailsUserInfoProps {
  bio: string;
  self: boolean;
  token: string;
  userId: string;
  currentUserAccessLevel: number;
  userSearchAccessLevel: number;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
}

export interface IUser {
  Id: string;
  avatar: string;
  firstname: string;
  lastname: string;
  username: string;
  classrooms: IClassroom[];
  studentClassroom: IClassroom[];
  skills: ISkill[];
  bio: string;
  accessLevel: number;
  dob: string;
  gender: string;
  email: string;
  phone: string;
}

export interface ISkill {
  Id: string;
  name: string;
  color: string;
}

interface IClassroom {
  Id: string;
  name: string;
  description: string;
}

interface ICreateSkillData {
  createSkill: {
    Id: string;
    name: string;
    color: string;
    userId: string;
    __typename: string;
  };
}
