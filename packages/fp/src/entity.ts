import { z } from "zod";
import { deepFreeze } from "./utils/deep-freeze.ts";

/**
 * Abstracted Entity Functions
 */
export function EntityFunctions<T, S>(schema: z.ZodSchema<T>) {
  function create(params: T): Readonly<T> {
    !schema.parse(params);
    return deepFreeze(params);
  }

  // NOTE: Workaround: <{ id: S } & T> explains this type has "id" property.
  function equals(obj1: { id: S } & T, obj2: { id: S } & T): boolean {
    return obj1.id === obj2.id;
  }

  function update(
    obj: { id: S } & T,
    changes: Omit<Partial<T>, "id">
  ): Readonly<T> {
    const updated = { ...obj, ...changes, id: obj.id };
    // NOTE: Immutable
    return create(updated);
  }

  return {
    create,
    equals,
    update,
  };
}
