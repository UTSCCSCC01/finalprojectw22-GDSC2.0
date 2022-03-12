const Resource = require("../models/resourceModel");

const getResource = async (req, res) => {
  Resource.find()
    .then((r) => res.json(r))
    .catch((e) => res.json({ message: e }));
};

const addResource = async (req, res) => {
  const resource = new Resource({
    section: req.body.section,
    name: req.body.name,
    link: req.body.link,
    description: req.body.description,
  });

  resource
    .save()
    .then((data) => res.status(200).json(data))
    .catch((e) => res.json({ message: e }));
};

const deleteResource = async (req, res) => {
  Resource.remove({ _id: req.body.resourceId })
    .then((r) => res.json(r))
    .catch((e) => res.json({ message: e }));
};

module.exports = { getResource, addResource, deleteResource };
