import { v4 } from "uuid";
import { z } from "zod";
import {
  PilotLicenseCardEntityFunctions,
  PilotLicenseCardValue,
  StarshipClassification,
} from "../entity-pilot-license-card.ts";

const RequestedNameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().optional(),
});
type RequestedName = z.infer<typeof RequestedNameSchema>;

export function createService({
  save,
  findAll,
}: {
  save: (card: PilotLicenseCardValue) => Promise<void>;
  findAll: () => Promise<PilotLicenseCardValue[]>;
}) {
  async function issueFor(req: RequestedName) {
    const pilotLicenseCard = await PilotLicenseCardEntityFunctions.create({
      id: v4(),
      fullName: req, // NOTE: No implementation details. Value Object is not a dependency.
      starShipClassification: StarshipClassification.LightFreighter,
    });
    save(pilotLicenseCard);

    const licenses = await findAll();
    return licenses;
  }

  return {
    issueFor,
  };
}
