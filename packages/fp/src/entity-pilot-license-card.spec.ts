import {
  PilotLicenseCardEntityFunctions,
  PilotLicenseCardValue,
  StarshipClassification,
} from "./entity-pilot-license-card.ts";
import { FullNameValueObjectFunctions } from "./value-object-name.ts";

describe("Entity", () => {
  describe("PilotLicenseCardFunctions", () => {
    let pilotLicenseCard: PilotLicenseCardValue;
    beforeEach(() => {
      pilotLicenseCard = PilotLicenseCardEntityFunctions.create({
        id: "123456789",
        fullName: { firstName: "Luke", lastName: "Skywalker" },
        starShipClassification: StarshipClassification.SpaceTransport,
      });
    });

    it("should compare ids", () => {
      expect(
        PilotLicenseCardEntityFunctions.equals(
          pilotLicenseCard,
          pilotLicenseCard
        )
      ).toEqual(true);
    });

    it("should display the name", () => {
      // This is Full Name Value Object's responsibility.
      expect(
        FullNameValueObjectFunctions.display(pilotLicenseCard.fullName)
      ).toEqual("Luke Skywalker");
    });

    // NOTE: The object is a pure data. It does not require any method.
    it("should display the starShipClassification", () => {
      expect(pilotLicenseCard.starShipClassification).toEqual(
        "Space Transport"
      );
    });

    it("should display the starShipClassification via the custom function", () => {
      expect(
        PilotLicenseCardEntityFunctions.classification(pilotLicenseCard)
      ).toEqual("Space Transport");
    });

    describe("update values", () => {
      const updatedStarShipClassification =
        StarshipClassification.LightFreighter;
      beforeEach(() => {
        pilotLicenseCard = PilotLicenseCardEntityFunctions.update(
          pilotLicenseCard,
          {
            starShipClassification: updatedStarShipClassification,
          }
        );
      });

      it("should update the starShipClassification", () => {
        expect(
          PilotLicenseCardEntityFunctions.classification(pilotLicenseCard)
        ).toEqual(updatedStarShipClassification);
      });
    });
  });
});
