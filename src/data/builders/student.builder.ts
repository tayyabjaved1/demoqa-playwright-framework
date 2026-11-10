import { StudentFactory } from '../factories/student.factory';
import type { StudentData } from '../types/test-data.types';

/** Fluent builder for scenario-specific data without creating one factory per scenario. */
export class StudentBuilder {
  private data: Partial<StudentData> = {};
  withGender(gender: StudentData['gender']): this { this.data.gender = gender; return this; }
  fromLocation(state: string, city: string): this { this.data.state = state; this.data.city = city; return this; }
  withSubjects(...subjects: string[]): this { this.data.subjects = subjects; return this; }
  build(): StudentData { return StudentFactory.create(this.data); }
}
