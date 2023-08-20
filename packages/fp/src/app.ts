import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { db } from "./my-database.ts";
import { createRepositoryPilotLicenseCard } from "./repository-pilot-license-card.ts";
import { createService } from "./services/issue-pilot-license-card.ts";

const app = new Hono();

/**
 * ChatGPT says,
 * In functional programming (FP), dependencies are often passed explicitly as arguments to functions, rather than being injected by a container.
 * This naturally leads to a form of loose coupling since functions are parameterized by the dependencies they need.
 */
const { save, findAll } = createRepositoryPilotLicenseCard(db);
const { issueFor } = createService({ save, findAll });

app.post("/issue", async (c) => {
  const { firstName, lastName, middleName } = await c.req.json();
  const licenses = await issueFor({ firstName, lastName, middleName });
  // Value Object and Entity are always flattened.
  return c.json({ message: JSON.stringify(licenses) });
});

serve({
  fetch: app.fetch,
  port: 3002,
});

// curl -X POST -H "Content-Type: application/json" -d '{"firstName": "Luke", "lastName": "Skywalker"}' http://localhost:3002/issue
