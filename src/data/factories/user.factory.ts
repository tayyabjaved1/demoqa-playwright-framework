import { CommonGenerator as gen } from '../generators/common.generator';
import type { UserData, UserRole } from '../types/test-data.types';

export class UserFactory {
  static create(overrides: Partial<UserData> = {}, role: UserRole = 'student'): UserData {
    return {
      id: gen.id(), firstName: gen.firstName(), lastName: gen.lastName(),
      username: gen.username(), email: gen.email(), password: gen.password(), role,
      ...overrides
    };
  }
  static admin(overrides: Partial<UserData> = {}): UserData {
    return this.create({ role: 'admin', ...overrides }, 'admin');
  }
  static bookstoreUser(overrides: Partial<UserData> = {}): UserData {
    return this.create(overrides, 'bookstore-user');
  }
}
