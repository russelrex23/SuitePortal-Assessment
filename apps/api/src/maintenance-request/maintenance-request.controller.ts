import {BadRequestException, Body, Controller, Post, Get, Param, Res, HttpStatus, Delete} from '@nestjs/common';
import { AuthenticationRequest, MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceRequestService } from './maintenance-request.service';

@Controller('maintenance-requests')
export class MaintenanceRequestController {

  constructor(
    private readonly maintenanceRequestService: MaintenanceRequestService,
  ) {

  }

  @Post('/login')
  public async validateUser(
    @Body() authenticationRequest: AuthenticationRequest,
  ) {
    if (!authenticationRequest?.username) {
      throw new BadRequestException('Must provide a username');
    }
    if (!authenticationRequest?.password) {
      throw new BadRequestException('Must provide a password');
    }
    return await this.maintenanceRequestService.validateUser(authenticationRequest.username, authenticationRequest.password);
  }

  @Post('/')
  public async createMaintenanceRequest(
    @Body() maintenanceRequest: MaintenanceRequest,
  ) {
    if (!maintenanceRequest?.summary) {
      throw new BadRequestException('Must provide a valid summary');
    }
    if (!maintenanceRequest?.serviceType) {
      throw new BadRequestException('Must provide a valid Service Type');
    }
    return await this.maintenanceRequestService.createMaintenanceRequest(maintenanceRequest);
  }

  @Get('/:id')
  public async getMaintenanceRequest(
    @Param('id') id: string,
  ) {
    if (!id) {
      throw new BadRequestException('No id provided');
    }
    return await this.maintenanceRequestService.getMaintenanceRequest(id);
  }

  @Get('/')
  public async getAllMaintenanceRequest(
    @Res() res
  ) {
    const data = await this.maintenanceRequestService.getAllMaintenanceRequest();
    return await res.status(HttpStatus.OK).json({
      response: data
    })
  }

  @Delete('/:id/close')
  public async deleteMaintenanceRequest(
    @Param('id') id: string,
  ) {
    if (!id) {
      throw new BadRequestException('No id provided');
    }
    return await this.maintenanceRequestService.deleteMaintenanceRequest(id);
  }

}
