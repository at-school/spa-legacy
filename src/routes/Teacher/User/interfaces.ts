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
}

export interface IUserProps extends IUserWithGraphQlProps {
  getUserInfoQuery: {
    user?: IUser[];
  };
}

export interface IBasicUserInfoProps {
  avatar: string;
  name: string;
  username: string;
  classrooms: IClassroom[];
  studentClassrooms: IClassroom[];
  skills: ISkill[];
}

export interface ISkillTagsWithContextProps {
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
