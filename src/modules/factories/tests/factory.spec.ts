import { expect, test } from '@playwright/test';
import { UserFactory } from '../../../data/factories/user.factory';
import { StudentFactory } from '../../../data/factories/student.factory';
import { StudentBuilder } from '../../../data/builders/student.builder';

test.describe('Data Factory Engine', { tag: '@regression' }, () => {
  test('creates unique runtime user data', async () => {
    const first = UserFactory.create();
    const second = UserFactory.create();
    expect(first.email).not.toBe(second.email);
    expect(first.username).not.toBe(second.username);
    expect(first.id).not.toBe(second.id);
  });

  test('supports role presets and scenario overrides', async () => {
    const admin = UserFactory.admin();
    const student = StudentFactory.create({ gender: 'Female', city: 'Lahore' });
    expect(admin.role).toBe('admin');
    expect(student.gender).toBe('Female');
    expect(student.city).toBe('Lahore');
  });

  test('builds scenario data fluently', async () => {
    const student = new StudentBuilder()
      .withGender('Other')
      .fromLocation('Punjab', 'Lahore')
      .withSubjects('Maths', 'Computer Science')
      .build();
    expect(student.gender).toBe('Other');
    expect(student.city).toBe('Lahore');
    expect(student.subjects).toEqual(['Maths', 'Computer Science']);
  });
});
