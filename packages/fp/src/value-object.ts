import deepEqual from "deep-equal";
import { z } from "zod";
import { deepFreeze } from "./utils/deep-freeze.ts";

/**
 * Abstracted Value Object Functions
 */
export function ValueObjectFunctions<T>(schema: z.ZodSchema<T>) {
  function create<T>(value: T): Readonly<T> {
    !schema.parse(value);
    return deepFreeze(value);
  }

  function equals(obj1: T, obj2: T): boolean {
    return deepEqual(obj1, obj2);
  }

  function update<T>(obj: T, changes: Partial<T>): Readonly<T> {
    const updated = { ...obj, ...changes };
    return create(updated);
  }

  return {
    create,
    equals,
    update,
  };
}
