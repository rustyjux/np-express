const { Router } = require("express");
const router = Router();
const { cryptoController } = require("./controllers/crypto.controllers");
const { cryptoCacheMiddleware } = require("./middleware/crypto.cache");
const { captureScreenshot } = require("./screenshot"); 


router.get("/", (req, res) => {
  res.send("Cache Project Home Page - new");
  res.status(200);
});
router.get("/crypto", cryptoCacheMiddleware, cryptoController);

router.get("/capture-screenshot", async (req, res) => {
    try {
        const urlToCapture = req.query.url || 'https://nordic-pulse.com/ski-areas/CA/BC/Black-Jack-Ski-Club'; // Get the URL from the query parameter
        const darkMode = req.query.darkMode || 'false'; // Set to true to switch map to dark mode
        
        const screenshot = await captureScreenshot(urlToCapture, darkMode);

        res.setHeader('Content-Type', 'image/png');
        res.send(screenshot);
    } catch (error) {
        console.error('Error capturing screenshot:', error);
        res.status(500).send('Error capturing screenshot');
    }
});

module.exports = router;