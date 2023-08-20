import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "reflect-metadata";
import { container } from "tsyringe";
import { MyDatabase } from "./MyDatabase.ts";
import { RepositoryPilotLicenseCard } from "./RepositoryPilotLicenseCard.ts";
import { PilotLicenseCardService } from "./services/PilotLicenseCardService.ts";

const app = new Hono();

/**
 * Database is an abstract class (Interface) and MyDatabase is an implementation.
 * We register MyDatabase as the implementation of Database. The Repository does not know (Decoupled).
 */
container.register("Database", { useClass: MyDatabase });
container.register("RepositoryPilotLicenseCard", {
  useClass: RepositoryPilotLicenseCard,
});
container.register("PilotLicenseCardService", {
  useClass: PilotLicenseCardService,
});

app.post("/issue", async (c) => {
  const { firstName, lastName, middleName } = await c.req.json();
  const service = container.resolve<PilotLicenseCardService>(
    PilotLicenseCardService
  );
  const licenses = await service.issueFor({
    firstName,
    lastName,
    middleName,
  });
  // Need to flatten.
  return c.json({ message: JSON.stringify(licenses.map((v) => v.value())) });
});

serve({
  fetch: app.fetch,
  port: 3001,
});

// curl -X POST -H "Content-Type: application/json" -d '{"firstName": "Luke", "lastName": "Skywalker"}' http://localhost:3001/issue
