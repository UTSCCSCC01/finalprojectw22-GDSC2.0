const Project = require("../models/projects.js");
const { body, validationResult } = require("express-validator");

const addPastProjects = async (req, res) => {
  const project = new Project({
    name: req.body.name,
    link: req.body.link,
    image_path: req.body.image_path,
    description: req.body.description,
  });
  project
    .save()
    .then((data) => res.status(200).json(data))
    .catch((e) => res.json({ message: e }));
};

const getPastProjects = async(req,res)=>{
  result = await Project.find({}).catch((e)=>{
    console.log(e)
    res.status(400).json({
      "error":e
    })
  })
  res.status(200).json({
    "projects":result
  })
}

const deletePastProjects = async (req,res)=>{
  await Project.findByIdAndDelete(req.body._id)
  .then((id)=>{
    res.status(204).json({
      "success":"success"
    })
  })
  .catch((e)=>{
    res.status(400).json({
      "error":e
    })
  })
}
const createValidator = [
  body("name","Name is empty").not().isEmpty(),
  body("link","Link is empty").not().isEmpty(),
  body("description","Description is empty").not().isEmpty(),
  (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
]



module.exports = {addPastProjects,getPastProjects,deletePastProjects,createValidator};
