/** Shared contract for domain factories; static factory classes can adopt this shape. */
export interface BaseFactory<T> {
  create(overrides?: Partial<T>): T;
}
