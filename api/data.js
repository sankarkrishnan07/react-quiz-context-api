// api/data.js
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const dataPath = path.join(__dirname, '../src/data/questions.json');
  const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  res.status(200).json(jsonData);
};