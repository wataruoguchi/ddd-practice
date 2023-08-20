import {
  FullNameValue,
  FullNameValueObjectFunctions,
} from "./value-object-name.ts";

describe("Value Object", () => {
  describe("FullNameValueObjectFunctions", () => {
    let name: FullNameValue;
    beforeEach(() => {
      name = FullNameValueObjectFunctions.create({
        firstName: "Luke",
        lastName: "Skywalker",
      });
    });

    it("should display the name", () => {
      expect(FullNameValueObjectFunctions.display(name)).toEqual(
        "Luke Skywalker"
      );
    });

    it("should change the last name", () => {
      expect(
        FullNameValueObjectFunctions.display(
          FullNameValueObjectFunctions.update(name, {
            lastName: "Vader",
          })
        )
      ).toEqual("Luke Vader");
      expect(FullNameValueObjectFunctions.display(name)).toEqual(
        "Luke Skywalker"
      );
    });

    it("can compare two names", () => {
      expect(
        FullNameValueObjectFunctions.equals(
          name,
          FullNameValueObjectFunctions.create({
            firstName: "Luke",
            lastName: "Skywalker",
          })
        )
      ).toEqual(true);
      expect(
        FullNameValueObjectFunctions.equals(
          name,
          FullNameValueObjectFunctions.create({
            firstName: "Luke",
            lastName: "Vader",
          })
        )
      ).toEqual(false);
    });
  });
});
