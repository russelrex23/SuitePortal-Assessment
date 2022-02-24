import { Injectable } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import { MaintenanceRequestDao, MaintenanceRequestDB } from './maintenance-request.dao';

@Injectable()
export class MaintenanceRequestService {

  constructor(
    private readonly maintReqDao: MaintenanceRequestDao,
  ) {
    //
  }

  async createMaintenanceRequest(maintenanceRequest: MaintenanceRequest) {
    return await this.maintReqDao.insertNewRequest(maintenanceRequest);
  }

  async getMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return await this.maintReqDao.getMaintenanceRequest(id);
  }

  async getAllMaintenanceRequest(): Promise<MaintenanceRequestDB> {
    return await this.maintReqDao.getAllMaintenanceRequest();
  }

  async validateUser(username: string, pass: string): Promise<MaintenanceRequestDB> {
    const user = await this.maintReqDao.findOne(username);
    // @ts-ignore
    if (user && user.password === pass) {
      // @ts-ignore

      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async deleteMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return await this.maintReqDao.deleteMaintenanceRequest(id);
  }
}
