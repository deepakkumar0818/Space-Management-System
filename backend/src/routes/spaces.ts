import { Router, Request, Response } from "express";
import { authMiddleware, requireRole } from "../middleware/auth";
import { LocationModel, SpaceModel } from "../models/Space";

const router = Router();

// Admin: create location
router.post(
  "/locations",
  authMiddleware,
  requireRole(["admin", "manager"]),
  async (req: Request, res: Response) => {
    try {
      const location = await LocationModel.create(req.body);
      return res.status(201).json(location);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return res.status(500).json({ message: "Failed to create location" });
    }
  }
);

// Admin: create space
router.post(
  "/spaces",
  authMiddleware,
  requireRole(["admin", "manager"]),
  async (req: Request, res: Response) => {
    try {
      const space = await SpaceModel.create(req.body);
      return res.status(201).json(space);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return res.status(500).json({ message: "Failed to create space" });
    }
  }
);

// Public: list locations with spaces (for user portal browsing)
router.get("/public/locations", async (_req: Request, res: Response) => {
  const locations = await LocationModel.find().lean();
  return res.json(locations);
});

router.get(
  "/public/locations/:locationId/spaces",
  async (req: Request, res: Response) => {
    const spaces = await SpaceModel.find({
      location: req.params.locationId,
      isActive: true,
    }).lean();
    return res.json(spaces);
  }
);

export default router;


