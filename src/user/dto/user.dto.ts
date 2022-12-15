import { UserRoles } from '../../user_roles/schema/user-roles.schema';

export class UserDto {
  readonly name: string;
  readonly surname: string;
  readonly contact: string;
  readonly email: string;
  readonly schoolName: string;
  readonly schoolRegion: string;
  password: string;
  readonly userRole: UserRoles;
}
