import deepEqual from "deep-equal";
import { z } from "zod";
import { deepFreeze } from "./utils/deep-freeze.ts";

export class ValueObject<T> {
  constructor(
    protected readonly schema: z.ZodSchema<T>,
    public readonly props: T
  ) {
    if (!schema.parse(props)) {
      throw new Error("Invalid value object");
    }
    this.props = props;
    deepFreeze(this);
  }

  protected create(props: T): this {
    const newProps = { ...this.props, ...props };
    if (!this.schema.safeParse(newProps)) {
      throw new Error("Invalid value object");
    }
    return new (this.constructor as new (props: T) => this)(props);
  }

  public update(props: Partial<T>): this {
    return this.create({ ...this.props, ...props });
  }

  public equals(other: ValueObject<T>): boolean {
    return deepEqual(this.props, other.props);
  }
}
