export enum ServiceType {
  Electrical = 'electrical',
  General = 'general',
  PestControl = 'pest-control',
  Plumbing = 'plumbing',
}

export const ALL_SERVICE_TYPES = [
  ServiceType.Electrical ,
  ServiceType.General ,
  ServiceType.PestControl ,
  ServiceType.Plumbing ,
];

export interface AuthenticationRequest {
  // username of the requester
  username: string;
  // password of the requester
  password: string;
}

export interface MaintenanceRequest {
  // Name of the requester
  name: string;
  // Email of the requester
  email: string;
  // The unit # in the building
  unitNumber: string;
  // The type of service being requested
  serviceType: ServiceType;
  // A summary of of the issue
  summary: string;
  // Any extra details
  details?: string;
}
