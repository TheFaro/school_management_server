// import { Administrators } from '../schema/school-info.schema';
// import { UserRoles } from '../../user_roles/schema/user-roles.schema';

export class SchoolInfoDto {
  readonly name: string;
  readonly region: string;
  readonly administrators: [string];
  readonly email: string;
}
