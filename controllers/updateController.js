const CountryModel = require("../models/Country");

async function updateController(req, res) {
    try {
        const { countryId, userConfidence } = req.body;
        if (!countryId || userConfidence === undefined) {
            return res.status(400).json({ error: "Missing required fields." });
        }
        const document = await CountryModel.findById(countryId);
        if (!document) {
            return res.status(404).json({ error: "Document not found." });
        }
        document.confidenceIndex = userConfidence;
        const updatedDocument = await document.save();
        return res.status(200).json({
            message: "Document updated successfully.",
            data: updatedDocument,
        });
    } catch (error) {
        console.error("Update error: ", error);
        res.status(500).json({ error: "Internal server error." });
    }
}

module.exports = updateController;
