/** Optional registry for teams that prefer resolving domain factories by a stable key. */
export type FactoryFunction<T> = (overrides?: Partial<T>) => T;

export class FactoryRegistry {
  private static readonly factories = new Map<string, FactoryFunction<unknown>>();

  static register<T>(name: string, factory: FactoryFunction<T>): void {
    if (this.factories.has(name)) throw new Error(`Factory already registered: ${name}`);
    this.factories.set(name, factory as FactoryFunction<unknown>);
  }

  static create<T>(name: string, overrides?: Partial<T>): T {
    const factory = this.factories.get(name);
    if (!factory) throw new Error(`Unknown factory: ${name}. Register it before use.`);
    return factory(overrides as Partial<unknown>) as T;
  }

  static has(name: string): boolean { return this.factories.has(name); }
}
