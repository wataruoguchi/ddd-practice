import { z } from "zod";

// NOTE: Workaround: <{ id: S } & T> explains this type has "id" property.
export class Entity<T, S> {
  protected props: Omit<T, "id">;
  public readonly id: S;

  constructor(
    protected readonly schema: z.ZodSchema<{ id: S } & T>,
    params: { id: S } & T
  ) {
    const { id, ...props } = this.schema.parse(params);
    this.id = id;
    this.props = props;
  }

  public equals(other: Entity<T, S>): boolean {
    return this.id === other.id;
  }

  public update(newProps: Omit<Partial<T>, "id">): void {
    const props = { ...this.props, ...newProps };
    this.schema.parse({ ...props, id: this.id });
    // NOTE: Mutable
    this.props = props;
  }

  // NOTE: Because 'props' is mutable, we want it to be protected. To expose the value, we need to create a method.
  public value() {
    // TODO: ValueObject (e.g., FullName) should be flattened.
    return { id: this.id, ...this.props };
  }
}
