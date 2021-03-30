import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../../entities/project.entity';
import { Repository } from 'typeorm';
import { IResponse } from '../../interface/response.interface';

const logger = new Logger("project.service")

@Injectable()
export class ProjectService {

  private response: IResponse

  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>
  ) { }

  /**
   * @description: 增加项目方法
   * @param {Project} project
   * @return {*}
   */
  public async createProject(project: Project) {
    try {
      const data = await this.projectsRepository.save(project)
      this.response = {
        code: 0,
        msg: '项目保存成功',
        projectId: data.id
      }
    } catch (error) {
      logger.warn("创建项目失败")
      this.response = {
        code: 1,
        msg: '项目创建失败'
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
}
