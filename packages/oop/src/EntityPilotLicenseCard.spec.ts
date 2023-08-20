import {
  PilotLicenseCard,
  StarshipClassification,
} from "./EntityPilotLicenseCard.ts";
import { FullName } from "./ValueObjectFullName.ts";

describe("Entity", () => {
  describe("PilotLicenseCard", () => {
    let pilotLicenseCard: PilotLicenseCard;
    beforeEach(() => {
      pilotLicenseCard = new PilotLicenseCard({
        id: "123456789",
        fullName: new FullName({
          firstName: "Luke",
          lastName: "Skywalker",
        }),
        starShipClassification: StarshipClassification.SpaceTransport,
      });
    });

    it("should compare ids", () => {
      expect(pilotLicenseCard.equals(pilotLicenseCard)).toEqual(true);
    });

    it("should display the name", () => {
      expect(pilotLicenseCard.value().fullName.display()).toEqual(
        "Luke Skywalker"
      );
    });

    it("should display the starShipClassification", () => {
      expect(pilotLicenseCard.value().starShipClassification).toEqual(
        "Space Transport"
      );
    });

    it("should display the starShipClassification via the method that parent class does not have", () => {
      expect(pilotLicenseCard.classification).toEqual("Space Transport");
    });

    it("should output the value", () => {
      expect(pilotLicenseCard.value()).toEqual({
        id: "123456789",
        fullName: new FullName({
          firstName: "Luke",
          lastName: "Skywalker",
        }),
        starShipClassification: StarshipClassification.SpaceTransport,
      });
    });

    describe("update values", () => {
      const updatedStarShipClassification =
        StarshipClassification.LightFreighter;
      beforeEach(() => {
        pilotLicenseCard.update({
          starShipClassification: updatedStarShipClassification,
        });
      });

      it("should update the starShipClassification", () => {
        expect(pilotLicenseCard.classification).toEqual(
          updatedStarShipClassification
        );
      });
    });
  });
});
