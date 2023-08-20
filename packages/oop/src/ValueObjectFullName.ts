import { z } from "zod";
import { ValueObject } from "./ValueObject.ts";

const FullNameValueSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  middleName: z.string().optional(),
});

type FullNameValue = z.infer<typeof FullNameValueSchema>;

export class FullName extends ValueObject<FullNameValue> {
  constructor(props: FullNameValue) {
    super(FullNameValueSchema, props);
  }
  display() {
    return [this.props.firstName, this.props.middleName, this.props.lastName]
      .filter((val) => val && val.length > 0)
      .join(" ");
  }
}
