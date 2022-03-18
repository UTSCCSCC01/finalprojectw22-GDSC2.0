const Resource = require("../models/projects.js");


const reqPastProjects = async (req, res) => {
  const project = new Project({
    
    name: req.body.name,
    link: req.body.link,
    image_path: res.data.image_path,
    description: req.body.description,
  });

  project
    .save()
    .then((data) => res.status(200).json(data))
    .catch((e) => res.json({ message: e }));
};



module.exports = {reqPastProjects};
