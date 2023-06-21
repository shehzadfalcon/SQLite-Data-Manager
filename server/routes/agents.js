const router = require("express").Router();
const { Agent, Review } = require("../model");

router.get("/agents", async (req, res, next) => {
  const agents = await Agent.findAll();
  return res.json(agents);
});

// POST REQUEST TO CREATE AGENT
router.post("/agents", async (req, res) => {
  try {
    const data = req.body;
    const agent = await Agent.create(data);
    res.status(201).send(agent.toJSON());
  } catch (err) {
    console.log("ERROR -->", err);
    return res.sendStatus(500);
  }
});

// GET AGENT BY ID
router.get("/agents/:id", async (req, res) => {
  try {
    const agentId = req.params.id;
    const agentDetails = await Agent.findOne({
      where: { id: agentId },
      include: Review,
    });

    res.status(200).send(agentDetails.toJSON());
  } catch (error) {
    console.log("ERROR -->", error);
    return res.sendStatus(500);
  }
});

// CREATING REVIEW FOR THE AGENT
router.post("/agent/:id", async (req, res) => {
  try {
    const { desc, rating } = req.body;
    const agentId = req.params.id;

    const review = await Review.create({
      desc: desc,
      rating: rating,
      agentId: agentId,
    });

    return res.send(review.toJSON());
  } catch (error) {
    console.log("ERROR -->", error);
    return res.sendStatus(500);
  }
});

module.exports = router;
