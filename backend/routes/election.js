const express = require('express');
const Election = require('../models/Election');
const router = express.Router();

// Create a new election (admin)
router.post('/create', async (req, res) => {
  const { title, candidates } = req.body;

  const election = new Election({ title, candidates });
  await election.save();

  res.json({ message: 'Election created successfully' });
});

// Get all elections
router.get('/', async (req, res) => {
  const elections = await Election.find();
  res.json(elections);
});

// Cast a vote
router.post('/vote/:electionId', async (req, res) => {
  const { candidate } = req.body;
  const election = await Election.findById(req.params.electionId);

  if (!election || !election.isActive) {
    return res.status(400).json({ message: 'Election not found or closed' });
  }

  const selectedCandidate = election.candidates.find(c => c.name === candidate);
  if (!selectedCandidate) {
    return res.status(400).json({ message: 'Candidate not found' });
  }

  selectedCandidate.votes += 1;
  await election.save();

  res.json({ message: 'Vote cast successfully' });
});

module.exports = router;
