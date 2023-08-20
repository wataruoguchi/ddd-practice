import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";
import { z } from "zod";
import {
  PilotLicenseCard,
  StarshipClassification,
} from "../EntityPilotLicenseCard.ts";
import type { RepositoryPilotLicenseCard } from "../RepositoryPilotLicenseCard.ts";
import { FullName } from "../ValueObjectFullName.ts";

const RequestedNameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().optional(),
});
type RequestedName = z.infer<typeof RequestedNameSchema>;

@injectable()
export class PilotLicenseCardService {
  constructor(
    @inject("RepositoryPilotLicenseCard")
    private repository: RepositoryPilotLicenseCard
  ) {}
  async issueFor(req: RequestedName): Promise<PilotLicenseCard[]> {
    const pilotLicenseCard = new PilotLicenseCard({
      id: v4(),
      fullName: new FullName(req),
      starShipClassification: StarshipClassification.LightFreighter,
    });
    this.repository.save(pilotLicenseCard);

    const licenses = await this.repository.findAll();
    return licenses;
  }
}
