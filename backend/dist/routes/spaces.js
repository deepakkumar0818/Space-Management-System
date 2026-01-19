"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const Space_1 = require("../models/Space");
const router = (0, express_1.Router)();
// Admin: create location
router.post("/locations", auth_1.authMiddleware, (0, auth_1.requireRole)(["admin", "manager"]), async (req, res) => {
    try {
        const location = await Space_1.LocationModel.create(req.body);
        return res.status(201).json(location);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return res.status(500).json({ message: "Failed to create location" });
    }
});
// Admin: create space
router.post("/spaces", auth_1.authMiddleware, (0, auth_1.requireRole)(["admin", "manager"]), async (req, res) => {
    try {
        const space = await Space_1.SpaceModel.create(req.body);
        return res.status(201).json(space);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return res.status(500).json({ message: "Failed to create space" });
    }
});
// Public: list locations with spaces (for user portal browsing)
router.get("/public/locations", async (_req, res) => {
    const locations = await Space_1.LocationModel.find().lean();
    return res.json(locations);
});
router.get("/public/locations/:locationId/spaces", async (req, res) => {
    const spaces = await Space_1.SpaceModel.find({
        location: req.params.locationId,
        isActive: true,
    }).lean();
    return res.json(spaces);
});
exports.default = router;
//# sourceMappingURL=spaces.js.map