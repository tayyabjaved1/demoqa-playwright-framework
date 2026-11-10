import { CommonGenerator as gen } from '../generators/common.generator';
import { UserFactory } from './user.factory';
import type { StudentData } from '../types/test-data.types';

export class StudentFactory {
  static create(overrides: Partial<StudentData> = {}): StudentData {
    const user = UserFactory.create();
    const birth = gen.date();
    const student: StudentData = {
      ...user,
      gender: gen.pick(['Male', 'Female', 'Other'] as const),
      mobile: gen.phone(),
      dateOfBirth: `${birth.getDate()} ${birth.toLocaleString('en-US', { month: 'short' })} ${birth.getFullYear()}`,
      subjects: [gen.pick(['Maths', 'English', 'Physics', 'Chemistry', 'Computer Science'])],
      hobbies: [gen.pick(['Sports', 'Reading', 'Music'])],
      address: gen.address(), state: 'NCR', city: 'Delhi',
      ...overrides
    };
    return student;
  }
}
