import { z } from "zod";
import { EntityFunctions } from "./entity.ts";
import { FullNameValueSchema } from "./value-object-name.ts";

export enum StarshipClassification {
  LightFreighter = "Light Freighter",
  Fighter = "Fighter",
  SpaceTransport = "Space Transport",
}

const PilotLicenseCardValueSchema = z.object({
  id: z.string(),
  fullName: FullNameValueSchema, // NOTE: No implementation details. Pure data.
  starShipClassification: z.nativeEnum(StarshipClassification),
});

export type PilotLicenseCardValue = z.infer<typeof PilotLicenseCardValueSchema>;

export const PilotLicenseCardEntityFunctions = {
  ...EntityFunctions(PilotLicenseCardValueSchema),
  classification: (card: PilotLicenseCardValue) => card.starShipClassification,
};
