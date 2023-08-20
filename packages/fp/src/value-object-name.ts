import { z } from "zod";
import { ValueObjectFunctions } from "./value-object.ts";

export const FullNameValueSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  middleName: z.string().min(1).optional(),
});

export type FullNameValue = z.infer<typeof FullNameValueSchema>;

export const FullNameValueObjectFunctions = {
  ...ValueObjectFunctions(FullNameValueSchema),
  display: (name: FullNameValue) =>
    [name.firstName, name.middleName, name.lastName]
      .filter((val) => val && val.length > 0)
      .join(" "),
};
