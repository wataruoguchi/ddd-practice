import { z } from "zod";
import { Entity } from "./Entity.ts";
import { FullName } from "./ValueObjectFullName.ts";

export enum StarshipClassification {
  LightFreighter = "Light Freighter",
  Fighter = "Fighter",
  SpaceTransport = "Space Transport",
}

const PilotLicenseCardValueSchema = z.object({
  id: z.string(),
  fullName: z.instanceof(FullName), // NOTE: The schema rely on the implementation detail ("class") of FullName
  starShipClassification: z.nativeEnum(StarshipClassification),
});

type PilotLicenseCardValue = z.infer<typeof PilotLicenseCardValueSchema>;

// NOTE: Explicitly define the type of the props and the id.
export class PilotLicenseCard extends Entity<PilotLicenseCardValue, string> {
  constructor(params: PilotLicenseCardValue) {
    super(PilotLicenseCardValueSchema, params);
  }

  public get classification() {
    return this.props.starShipClassification;
  }
}
