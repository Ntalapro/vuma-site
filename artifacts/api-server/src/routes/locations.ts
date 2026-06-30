import { Router, type IRouter } from "express";
import { db, sharedLocationsTable } from "@workspace/db";
import { CreateLocationBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/locations", async (req, res) => {
  const parsed = CreateLocationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid location data" });
    return;
  }

  const [row] = await db
    .insert(sharedLocationsTable)
    .values({
      label: parsed.data.label ?? null,
      latitude: parsed.data.latitude,
      longitude: parsed.data.longitude,
      accuracy: parsed.data.accuracy ?? null,
    })
    .returning();

  req.log.info({ id: row.id }, "stored shared location");
  res.status(201).json(row);
});

export default router;
