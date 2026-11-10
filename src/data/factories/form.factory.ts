import { CommonGenerator as gen } from '../generators/common.generator';
import type { TextBoxData } from '../types/test-data.types';

export class FormFactory {
  static textBox(overrides: Partial<TextBoxData> = {}): TextBoxData {
    return {
      fullName: gen.fullName(), email: gen.email(),
      currentAddress: gen.address(), permanentAddress: gen.address(),
      ...overrides
    };
  }
}
