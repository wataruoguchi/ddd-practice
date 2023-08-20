import { FullName } from "./ValueObjectFullName.ts";

describe("Value Object", () => {
  describe("FullName", () => {
    let name: FullName;
    beforeEach(() => {
      name = new FullName({
        firstName: "Luke",
        lastName: "Skywalker",
      });
    });

    it("should display the name", () => {
      expect(name.display()).toEqual("Luke Skywalker");
    });

    it("should change the last name", () => {
      expect(name.update({ lastName: "Vader" }).display()).toEqual(
        "Luke Vader"
      );
      expect(name.display()).toEqual("Luke Skywalker");
    });

    it("can compare two names", () => {
      expect(
        name.equals(
          new FullName({
            firstName: "Luke",
            lastName: "Skywalker",
          })
        )
      ).toEqual(true);
      expect(
        name.equals(
          new FullName({
            firstName: "Luke",
            lastName: "Vader",
          })
        )
      ).toEqual(false);
    });

    // It does not display error in TypeScript. It fails in runtime.
    it.skip("should not change the last name", () => {
      name.props.lastName = "Vader";
      expect(name.display()).toEqual("Luke Skywalker");
    });
  });
});
