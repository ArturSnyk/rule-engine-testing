const express = require('express');
const router = express.Router();

const { readFileSync } = require('fs');
const { resolve } = require('path');
const _ = require('lodash');
const rules = require('../lib/rules');

const fixtureJSON = readFileSync(resolve(__dirname, '../fixture/saml/saml-example-profile.json'), { encoding: 'utf8' });
const samlExample = JSON.parse(fixtureJSON);

/* GET users listing. */
router.get('/', async function (req, res, next) {
  console.log('>>>>>>>>>>>>>>>>>>>>>>');
  console.log(_.get(samlExample, '_json.nameIdAttributes.value'));
  console.log('<<<<<<<<<<<<<<<<<<<<<<');
  await rules.run();
  // res.send('respond with a resource');
  res.write('A saml example\n');
  res.write('>>>>>>>>>>>>>>>>>>>>>>\n');
  res.write(fixtureJSON);
  res.write('>>>>>>>>>>>>>>>>>>>>>>\n');
  res.end()
});

module.exports = router;
