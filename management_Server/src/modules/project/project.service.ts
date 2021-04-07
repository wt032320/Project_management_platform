import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../../entities/project.entity';
import { Repository } from 'typeorm';
import { IResponse } from '../../interface/response.interface';
import { IProject } from 'src/interface/project.interface';
import { UsersService } from '../users/users.service';
import { getNowDate } from '../../utils/getdate';

const logger = new Logger("project.service")

@Injectable()
export class ProjectService {

  private response: IResponse
  private pageSize: number = 7
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private readonly userService: UsersService
  ) { }

  /**
   * @description: 增加项目方法
   * @param {Project} project
   * @return {*}
   */
  public async createProject(project: Project) {
    try {
      const data = await this.projectsRepository.save(project)
      data.date = getNowDate()
      await this.projectsRepository.save(project)
      this.userService.addUserProject(data.id, data.creatorId)
      this.response = {
        code: 0,
        msg: '项目保存成功',
        projectId: data.id
      }
    } catch (error) {
      logger.warn("创建项目失败")
      this.response = {
        code: 1,
        msg: error
      }
    }
    return this.response
  }

  /**
   * @description: 删除项目方法
   * @param {string} projectId
   * @return {*}
   */
  public async deleteProjectById(projectId: string) {
    return await this.projectsRepository.findOne(projectId)
      .then(async res => {
        if (res !== undefined) {
          try {
            await this.projectsRepository.remove(res)
            this.response = {
              code: 0,
              msg: '项目删除成功'
            }
            return this.response
          } catch (error) {
            this.response = {
              code: 3,
              msg: '项目删除失败'
            }
            throw this.response
          }
        } else if(res === undefined) {
          this.response = {
            code: 1,
            msg: '该项目不存在'
          }
          throw this.response
        }
      })
      .catch(err => {
        return this.response
      })
  }

  /**
   * @description: 修改项目方法
   * @param {string} projectId
   * @param {Project} project
   * @return {*}
   */
  public async alterProjectById(projectId: string, project: Project) {
    return await this.projectsRepository.findOne(projectId)
      .then(async (res) => {
        if (res !== undefined) {
          try {
            await this.projectsRepository.save(project)
            this.response = {
              code: 0,
              msg: '项目修改成功'
            }
            return this.response
          } catch (error) {
            this.response = {
              code: 7,
              msg: '项目修改失败'
            }
            throw this.response
          }
        } else if (res === undefined) {
          this.response = {
            code: 2,
            msg: '该项目不存在'
          }
          return this.response
        }
      })
      .catch(err => {
        return this.response
      })
  }

  /**
   * @description: 通过id获取项目
   * @param {string} projectId
   * @return {*}
   */
  public async findProjectById(projectId: string) {
    try {
      const _project = await this.projectsRepository.findOne(projectId)
      this.response = {
        code: 0,
        msg: _project
      }
    } catch (error) {
      this.response = {
        code: 7,
        msg: '查询项目失败'
      }
    }
    return this.response
  }

  /**
   * @description: 获取当前用户所有项目
   * @param {*}
   * @return {*}
   */
  public async getProjectsByUser(userid: string, page?: number) {
    const identities = {};
    let ownProjects; // 个人所有项目信息
    let pageNums: number; // 项目页数
    try {
      const user = await this.userService.findOneById(userid)
      const projects = user.projects.trim().split(' ')
      const allproject = projects.map(v => JSON.parse(v))
      const projectIds = allproject.map(v => {
        identities[v.projectId] = v.identity
        return v.projectId
      })
      pageNums = Math.ceil(allproject.length / this.pageSize) // .ceil()返回大于等于x的最小整数
      // 查询用户项目数据
      ownProjects = await this.projectsRepository.findByIds(
        projectIds, 
        { 
          order: {id: "ASC"}, // 选择排序 id升序
          skip: page ? (page - 1) * this.pageSize : 0, // 偏移(分页) 
          take: 7 // limit (分页) - 得到的最大实体数。
        })
    } catch (error) {
      this.response = {
        code: 7,
        msg: '项目查询失败'
      }
    }
    // 增加身份
    ownProjects = ownProjects.map(v => {
      v['identity'] = identities[v.id]
      return v
    })
    this.response = {
      code: 0,
      msg: { ownProjects, pageNums, page }
    }
    return this.response
  }
}
