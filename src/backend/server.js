const express = require('express');
const bodyParser = require('body-parser');
const templateformatter = require('./formatter/templateFormatter');
const createSchema = require('./schema/createSchema');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.get('/api/hello', (req, res) => {
  res.send({
    express: 'Hello From Express',
  });
});

app.post('/api/templateformatter', (req, res) => {
  const {
    template,
    modelData,
    nameAlias,
  } = req.body;
  const resp = templateformatter(template, modelData, nameAlias);
  res.send(resp);
});

app.post('/api/createschema', (req, res) => {
  const {
    schemaFields,
  } = req.body;
  const resp = createSchema(schemaFields);
  res.send({
    schema: resp,
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
