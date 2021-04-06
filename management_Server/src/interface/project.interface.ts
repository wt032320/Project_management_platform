interface IProject {
  id: string; // 项目编号
  name: string; // 项目名称
  description: string; // 项目简介
  creator: string; // 项目创建者
}

interface IUserProject {
  projectId: string; // 项目id
  identity: string; // 用户身份
}

export {
  IProject,
  IUserProject
}