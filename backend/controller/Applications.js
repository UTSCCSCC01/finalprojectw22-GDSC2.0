const mongoose = require("mongoose");
const studentAppModel = require("../models/studentAppModel");
const mentorAppModel = require("../models/mentorAppModel");
const { body,check, validationResult } = require("express-validator");

const dbs = ["sql", "nosql", "graph", "none"];
const plats = ["aws", "google_cloud", "firebase", "heroku", "netlify", "azure"];
const pre_dbs = ["sql", "nosql", "graph", "any"];
const pre_plats = [
  "aws",
  "google_cloud",
  "firebase",
  "heroku",
  "netlify",
  "azure",
  "any",
];
/** Gneral Endpoints */

exports.getStatus = async (req,res) =>{
  var student_num = req.body.student_num;
  var student_status = 0;
  var mentor_status = 0;
  var name = null;
  var studentApp = await studentAppModel.find({"student_num":student_num})
  .catch((e)=>{
    res.status(400).json({
      "errors": e
    })
    return;
  });
  var mentorApp = await mentorAppModel.find({'student_num':student_num})
  .catch((e)=>{
    res.status(400).json({
      "errors": e
    })
    return;
  });
  if (studentApp.length > 0){
    student_status = studentApp[0].status;
    name = studentApp[0].full_name;
  }
  if (mentorApp.length > 0){
    mentor_status = mentorApp[0].status;
    if (!name){
      name = mentorApp[0].full_name;
    }
  }
  res.status(200).json({
    "name" : name,
    "student": student_status,
    "mentor": mentor_status
  });

}
/** Student Endpoints */

exports.acceptStudentForm = async (req, res) => {
  if (req.body.student_num) {
    var student = await studentAppModel.findOne({"student_num":req.body.student_num});
    if (student.status < 4){
      student.status = student.status + 1;
    }
    student.save()
    res.status(200).json({
      status: "success",
    });
  } else {
    res.status(404).json({
      status: "Cannot find student with the corresponding student number",
    });
  }
};

exports.rejectStudentForm = async (req, res) => {
  if (req.query["_id"]) {
    await studentAppModel
      .findOneAndUpdate({
        _id: req.query._id,
      },{
        status:-1
      })
      .then((i)=>{
        res.status(200).json({
          success: "success"
        })
      })
      .catch((e) => {
        console.log(e);
        res.status(400).json({
          error: e,
        });
      });
  } else {
    res.status(404).json({
      status: "Cannot find student with the corresponding student number",
    });
  }
};

exports.submitStudentForm = async (req, res) => {
  await studentAppModel
    .create(req.body)
    .then((id) => {
      console.log(id);
    })
    .catch((e) => {
      console.log(e);
    });
  res.status(201).json({
    status: "success",
  });
};

exports.submitMentorForm = async (req, res) => {
  await mentorAppModel
    .create(req.body)
    .then((id) => {
      console.log(id);
    })
    .catch((e) => {
      console.log(e);
    });
  res.status(201).json({
    status: "success",
  });
};

exports.filterStudentApp = async (req, res) => {
  let query = buildQueryFitler(req.body);
  const filteredStudents = await studentAppModel
    .find(query)
    .where("year")
    .gte(req.body.year)
    .where("cgpa")
    .gte(req.body.cgpa)
    .find({ have_group: req.body.hasGroup })
    .sort({ creation_time: 1 });
  length = filteredStudents.length;
  var resStudents = null;
  if (
    (req.body.num_page - 1) * req.body.num_display > length ||
    req.body.num_page < 1
  ) {
    res.status(400).json({
      error: "Index of page out of range",
    });
  }
  if (length > 0) {
    const tail =
      req.body.num_page * req.body.num_display > length
        ? length
        : req.body.num_page * req.body.num_display;
    resStudents = filteredStudents.slice(
      (req.body.num_page - 1) * req.body.num_display,
      tail
    );
  }
  if (resStudents === null){
    resStudents = []
  }
  res.send({
    total: length,
    data: resStudents,
  });
};
/** Mentor Endpoints */
exports.acceptMentorForm = async (req, res) => {
  if (req.body.student_num) {
    var student = await mentorAppModel.findOne({"student_num":req.body.student_num});
    if (student.status < 4){
      student.status = student.status + 1;
    }
    student.save()
    res.status(200).json({
      status: "success",
    });
  } else {
    res.status(404).json({
      status: "Cannot find mentor with the corresponding student number",
    });
  }
};

exports.rejectMentorForm = async (req, res) => {
  if (req.query["_id"]) {
    await mentorAppModel
      .findOneAndUpdate({
        _id: req.query["_id"],
      },{
        status:-1
      })
      .then(() => {
        res.status(200).json({
          status: "reject success",
        });
      })
      .catch((e) => {
        console.log(e);
        res.status(400).json({
          error: e,
        });
      });
  } else {
    res.status(404).json({
      status: "Cannot find mentor with the corresponding student number",
    });
  }
};

exports.filterMentorApp = async (req, res) => {
  let query = buildQueryFitler(req.body);
  let length = 0;
  const filteredMentors = await mentorAppModel
    .find(query)
    .where("year")
    .gte(req.body.year)
    .where("cgpa")
    .gte(req.body.cgpa)
    .sort({ creation_time: 1 });
  length = filteredMentors.length;
  let resMentors = null;
  if (
    (req.body.num_page - 1) * req.body.num_display > length ||
    req.body.num_page < 1
  ) {
    res.status(400).json({
      error: "Index of page out of range",
    });
  }
  if (length > 0) {
    const tail =
      req.body.num_page * req.body.num_display > length
        ? length
        : req.body.num_page * req.body.num_display;
        resMentors = filteredMentors.slice(
      (req.body.num_page - 1) * req.body.num_display,
      tail
    );
  }
  if (resMentors === null){
    resMentors = []
  }
  res.send({
    total: length,
    data: resMentors,
  });
};
/** Validators */

exports.statusValidator = [
  body("student_num","Invalid Student Number").not().isEmpty().isString(),
  (req,res,next)=>{
    let errors = validationResult(req);
    if (!errors.isEmpty()){
      console.log(errors)
      return res.status(400).json({errors:errors.array()})
    }
    next();
  }
]

exports.studentAppValidator = [
  body("student_num", "Invalid Student Number")
    .not()
    .isEmpty()
    .isString()
    .isLength({ min: 10, max: 10 }),
  body("email", "Invalid Email").not().isEmpty().isEmail(),
  body("cgpa", "Invalid CGPA").not().isEmpty().isFloat({ min: 0, max: 4 }),
  body("year", "You need to be Second year and above")
    .not()
    .isEmpty()
    .isInt({ min: 2, max: 4 }),
  body("resume_path", "Please Provide Your Resume").not().isEmpty(),
  body("have_group", "Please let use know if you have a group")
    .not()
    .isEmpty()
    .isBoolean(),
  body("project_idea", "Please let use know if you have a project idea")
    .not()
    .isEmpty()
    .isBoolean(),
  body("databases", "Please select at least one databases").not().isEmpty(),
  body("platforms", "Please select at least one platforms").not().isEmpty(),
  (req, res, next) => {
    console.log(req);
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    errors = studentDetailValidator(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors: [errors] });
    }
    next();
  },
];

//This function probably needs to be modified to cover more fields
exports.mentorAppValidator = [
  body("student_num", "Invalid Student Number").not().isEmpty().isInt(),
  body("email", "Invalid Email").not().isEmpty().isEmail(),
  body("cgpa", "Invalid CGPA").not().isEmpty().isFloat({ min: 0, max: 4 }),
  body("year", "You need to be Second year and above")
    .not()
    .isEmpty()
    .isInt({ min: 2, max: 4 }),
  body("resume_path", "Please Provide Your Resume").not().isEmpty(),
  body("have_group", "Please let use know if you have a group")
    .not()
    .isEmpty()
    .isBoolean(),
  body("project_idea", "Please let use know if you have a project idea")
    .not()
    .isEmpty()
    .isBoolean(),
  body("databases", "Please select at least one databases").not().isEmpty(),
  body("platforms", "Please select at least one platforms").not().isEmpty(),
  (req, res, next) => {
    console.log(req)
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    errors = mentorDetailValidator(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors: [errors] });
    }
    next();
  },
];

function studentDetailValidator(req_data) {
  const errors = {};
  const email_re = /^[^\s@]+@mail.utoronto.ca/;
  if (!email_re.test(req_data["email"])) {
    errors["email"] = "Please use UofT email";
  }
  let db = req_data["databases"];
  let db_no_input = true;
  for (let i = 0; i < dbs.length; i++) {
    if (db[dbs[i]]) {
      db_no_input = false;
      break;
    }
  }
  if (db_no_input) {
    errors["database"] = "Please select at least one databases";
  }
  let platforms = req_data["platforms"];
  let empty = true;
  if (!(platforms["none"] || platforms["other"] !== "")) {
    let pre_select = platforms["pre_select"];
    if (pre_select) {
      for (let i = 0; i < plats.length; i++) {
        if (pre_select[plats[i]]) {
          empty = false;
          break;
        }
      }
    }
    if (empty) {
      errors["platforms"] = "Please select at least one platforms";
    }
  }
  if (req_data["have_group"]) {
    if (!req_data["group_members"]) {
      errors["group"] = "Please enter your group members' information";
    }
  }
  if (req_data["project_idea"]) {
    if (!req_data["idea_description"]) {
      errors["idea"] = "Please enter your idea description";
    }
  }
  return errors;
}

//This function probably needs to be modified to cover more fields
function mentorDetailValidator(req_data) {
  const errors = {};
  const email_re = /^[^\s@]+@mail.utoronto.ca/;
  if (!email_re.test(req_data["email"])) {
    errors["email"] = "Please use UofT email";
  }
  let db = req_data["databases"];
  let db_no_input = true;
  for (let i = 0; i < dbs.length; i++) {
    if (db[dbs[i]]) {
      db_no_input = false;
      break;
    }
  }
  if (db_no_input) {
    errors["database"] = "Please select at least one databases";
  }
  let platforms = req_data["platforms"];
  let empty = true;
  if (!(platforms["none"] || platforms["other"] !== "")) {
    let pre_select = platforms["pre_select"];
    if (pre_select) {
      for (let i = 0; i < plats.length; i++) {
        if (pre_select[plats[i]]) {
          empty = false;
          break;
        }
      }
    }
    if (empty) {
      errors["platforms"] = "Please select at least one platforms";
    }
  }
  if (req_data["have_group"]) {
    if (!req_data["group_members"]) {
      errors["group"] = "Please enter your group members' information";
    }
  }
  if (req_data["project_idea"]) {
    if (!req_data["idea_description"]) {
      errors["idea"] = "Please enter your idea description";
    }
  }
  return errors;
}

exports.studentQueryValidator = [
  body("hasGroup", "Invalid hasGroup").not().isEmpty().isBoolean(),
  body("status", "Invalid status").not().isEmpty().isInt({ min: 1, max: 4 }),
  body("year", "Invalid Year").not().isEmpty().isInt({ min: 2, max: 4 }),
  body("databases", "Invalid Databases").not().isEmpty(),
  body("databases.any", "Invalid  Databases Any").not().isEmpty().isBoolean(),
  body("cloudPlat", "Invalid Cloud Platform").not().isEmpty(),
  body("cloudPlat.any", "Invalid  Clout Platform Any")
    .not()
    .isEmpty()
    .isBoolean(),
  body("cgpa", "Invalid cgpa").not().isEmpty().isFloat({ min: 0, max: 4 }),
  body("num_display", "Invalid Num Display").not().isEmpty().isInt(),
  body("num_page", "Invalid Num Pagee").not().isEmpty().isInt(),
  (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    errors = querySubValidator(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors: [errors] });
    }
    next();
  },
];

exports.mentorQueryValidator = [
  body("status", "Invalid status").not().isEmpty().isInt({ min: 1, max: 4 }),
  body("year", "Invalid Year").not().isEmpty().isInt({ min: 2, max: 4 }),
  body("complete_pey", "Invalid Complate PEY").not().isEmpty().isBoolean(),
  body("databases", "Invalid Databases").not().isEmpty(),
  body("databases.any", "Invalid  Databases Any").not().isEmpty().isBoolean(),
  body("cloudPlat", "Invalid Cloud Platform").not().isEmpty(),
  body("cloudPlat.any", "Invalid  Clout Platform Any")
    .not()
    .isEmpty()
    .isBoolean(),
  body("cgpa", "Invalid cgpa").not().isEmpty().isFloat({ min: 0, max: 4 }),
  body("num_display", "Invalid Num Display").not().isEmpty().isInt(),
  body("num_page", "Invalid Num Pagee").not().isEmpty().isInt(),
  (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    errors = querySubValidator(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors: [errors] });
    }
    next();
  },
];

const querySubValidator = (req_data) => {
  const errors = {};
  const dbs = req_data.databases;
  const plats = req_data.cloudPlat;
  for (let key in dbs) {
    if (!(pre_dbs.includes(key) && typeof dbs[key] == "boolean")) {
      errors["databases"] = "databases has invalid input";
      break;
    }
  }
  for (let key in plats) {
    if (!(pre_plats.includes(key) && typeof plats[key] == "boolean")) {
      errors["databases"] = "databases has invalid input";
      break;
    }
  }
  return errors;
};
/** Query Helper */

const buildQueryFitler = (req_body) => {
  var query = {};
  if (!req_body.databases.any) {
    for (let key in req_body.databases) {
      if (key != "any") {
        query["databases." + key] = req_body.databases[key];
      }
      query["databases.none"] = false;
    }
  }
  if (!req_body.cloudPlat.any) {
    for (let key in req_body.cloudPlat) {
      if (key != "any") {
        query["platforms.pre_select." + key] = req_body.cloudPlat.key;
      }
    }
    query["platforms.none"] = false;
  }
  if (req_body["complete_pey"]) {
    query["complete_pey"] = req_body["complete_pey"];
  }
  query["status"] = req_body["status"];
  return query;
};
