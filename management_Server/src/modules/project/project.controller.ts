import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Project } from 'src/entities/project.entity';
import { ProjectService } from './project.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('project')
@ApiTags("用户项目模块")
// @UseGuards(AuthGuard('jwt')) // 使用jwt进行权限守卫
// @ApiBearerAuth('jwt')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService
  ) {}

  @Post("create")
  @ApiOperation({
    summary: "新增项目"
  })
  public addProject(@Body() project: Project) {
    return this.projectService.createProject(project)
  }

  @Post("delete/:id")
  @ApiOperation({
    summary: "删除项目"
  })
  public deleteProject(@Param("id") projectId: string) {
    return this.projectService.deleteProjectById(projectId)
  }

  @Post("alter/:id")
  @ApiOperation({
    summary: "修改项目"
  })
  public changeProject(@Param("id") projectId: string, @Body() project: Project) {
    return this.projectService.alterProjectById(projectId, project)
  }

  @Post("query/:id")
  @ApiOperation({
    summary: "查询项目"
  })
  public findProject(@Param("id") projectId: string) {
    return this.projectService.findProjectById(projectId)
  }

  @Get("projects")
  @ApiOperation({
    summary: "获取所有项目"
  })
  public getAllProject() {
    return this.projectService.getProjects()
  }
}
