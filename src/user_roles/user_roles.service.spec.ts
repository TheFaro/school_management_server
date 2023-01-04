import { Test, TestingModule } from '@nestjs/testing';
import { UserRolesService } from './user_roles.service';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from './config/user-roles-db.config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRoles, UserRolesSchema } from './schema/user-roles.schema';
import { UserRoleDto } from './dto/user-role.dto';

describe('UserRolesService', () => {
  let service: UserRolesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          {
            name: UserRoles.name,
            schema: UserRolesSchema,
          },
        ]),
      ],
      providers: [UserRolesService],
    }).compile();

    service = module.get<UserRolesService>(UserRolesService);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUserRole', () => {
    // creates new user role
    // check if user already exists
    it('should throw error if user already exists', async () => {
      // Arrange
      const payload = {
        _id: '63b5bb5a8bd141248f45a430',
        name: 'Administrator12',
        accessLevel: 1,
      };

      // Act
      await service.createUserRole(payload);
      const user1 = await service.createUserRole(payload);

      // Assert
      expect(user1).toStrictEqual({
        success: 0,
        message: 'User role already exists.',
      });
    });

    it('should successfully create new user role', () => {
      //  Arrange
      const payload: UserRoleDto = { name: 'Teacher', accessLevel: 2 };

      //  Act && Assert
      expect(
        async () => await service.createUserRole(payload),
      ).not.toStrictEqual({
        success: 0,
        message: 'User role already exists.',
      });
    });
  });

  describe('findAll', () => {
    // get all user roles
    it('should return all registered user roles', async () => {
      //  Arrange
      const payload1: UserRoleDto = { name: 'Administrator', accessLevel: 1 };
      const payload2: UserRoleDto = { name: 'Head Teacher', accessLevel: 2 };
      const payload3: UserRoleDto = { name: 'Secretary', accessLevel: 3 };

      await service.createUserRole(payload1);
      await service.createUserRole(payload2);
      await service.createUserRole(payload3);

      //  Act
      const roles = await service.findAll();

      //  Assert
      expect(roles).toHaveLength(4);
    });
  });

  describe('findOne', () => {
    // get only one user role
    it('should return only one user role', async () => {
      // Arrange
      const id = '63b5bb5a8bd141248f45a430';

      // Act
      const role = await service.findOne(id);

      // Assert
      expect(role).not.toBeUndefined();
    });
  });

  describe('updateOne', () => {
    // update one value of user roles by id
    it('should not update user roles that do not exist', async () => {
      // Arrange
      const id = '63b5bb5a8bd141248f45a431';
      const payload = {
        name: 'Teacher',
        accessLevel: 4,
      };
      // Act
      try {
        await service.updateOne(id, payload);
      } catch (e) {
        // Assert
        expect(e.message).toEqual('User role does not exist.');
      }
    });

    it('should update only one user role by id', async () => {
      // Arrange
      const id = '63b5bb5a8bd141248f45a430';
      const payload = {
        name: 'Teacher',
        accessLevel: 4,
      };
      // Act
      try {
        await service.updateOne(id, payload);
      } catch (e) {
        // Assert
        expect(e.message).toEqual('User role does not exist.');
      }
    });
  });

  describe('deleteOne', () => {
    // do not delete values that do not exist
    // delete one user role by id
    it('should not delete user roles that do not exist', async () => {
      // Arrange
      const id = '63b5bb5a8bd141248f45a431';

      // Act
      try {
        await service.deleteOne(id);
      } catch (e) {
        // Assert
        // console.log(e.message);
        expect(e.message).toEqual('User role does not exist. Delete failed.');
      }
    });

    it('should delete only one user role', async () => {
      // Arrange
      const id = '63b5bb5a8bd141248f45a430';

      // Act
      const role = await service.deleteOne(id);

      // Assert
      expect(role).toEqual({ acknowledged: true, deletedCount: 1 });
    });
  });
});
