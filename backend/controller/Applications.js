const mongoose = require("mongoose");
const studentAppModel = require("../models/studentAppModel");
const mentorAppModel = require("../models/mentorAppModel");
const {body,validationResult} = require('express-validator');

const dbs = ['sql','nosql','graph','none']
const plats = ['aws','google_cloud','firebase','heroku','netlify','azure']
const pre_dbs = ['sql','nosql','graph','any']
const pre_plats = ['aws','google_cloud','firebase','heroku','netlify','azure','any']
/** Gneral Endpoints */
exports.filterApplications = (async (req,res)=>{
    const num_display = req.body.num_display
    const num_page = req.body.num_page
    delete req.body.num_page
    delete req.body.num_display
    const filters = req.body;
    let length = 0;
    const filteredMentors = await mentorAppModel.filter((mentor)=>{
        return mentorFilter(filters,mentor)}
    ).sort({creation_time:1})
    const filteredStudents = await studentAppModel.filter((student)=>{
        return studentFilter(student_filter,student)}
    ).sort({creation_time:1})
    length = filteredMentors.length + filteredStudents.length
    if ((num_page-1) * num_display > length || num_page<1){
        res.status(400).json({
            error: "Index of page out of range"
        })
    }
    let resAll = null;
    if (length > 0){
        // for simplicity, we compare the date value of the last index
        // if one is greater, then that one (student or mentor) will have 3/4 of the application been sent
        const tail = num_page*num_display>length?length:num_page*num_display
        //let resStudents = filteredStudents.slice
    }
    res.send({
        total:length,
        data:resAll
    });

})
/** Student Endpoints */
exports.submitStudentForm = (async (req,res)=>{
    console.log("GOT TO END ROUTE");
    studentAppModel.create(req.body)
    .then((id)=>{
        console.log(id);
    })
    .catch((e)=>{
        console.log(e)
    })
    res.status(201).json({
      status: 'success',
    })
})

exports.filterStudentApp = (async (req,res)=>{
    const num_display = req.body.num_display
    const num_page = req.body.num_page
    delete req.body.num_page
    delete req.body.num_display
    const filters = req.body;
    const filteredStudents = await studentAppModel.filter((student)=>{
        return studentFilter(filters,student)}
    ).sort({creation_time:1})
    length = filteredStudents.length
    let resStudents = null;
    if ((num_page-1) * num_display > length || num_page<1){
        res.status(400).json({
            error: "Index of page out of range"
        })
    }
    if (length > 0){
        const tail = num_page*num_display>length?length:num_page*num_display
        resStudents = filteredStudents.slice((num_page-1)*num_display-1,tail-1)
    }
    res.send({
        total:length,
        data:resStudents
    });
})
/** Mentor Endpoints */

exports.filterMentorApp = (async (req,res)=>{
    const num_display = req.body.num_display
    const num_page = req.body.num_page
    delete req.body.num_page
    delete req.body.num_display
    const filters = req.body;
    let length = 0;
    const filteredMentors = await mentorAppModel.filter((mentor)=>{
        return mentorFilter(filters,mentor)}
    ).sort({creation_time:1})
    length = filteredMentors.length
    let resMentors = null;
    if ((num_page-1) * num_display > length || num_page<1){
        res.status(400).json({
            error: "Index of page out of range"
        })
    }
    if (length > 0){
        const tail = num_page*num_display>length?length:num_page*num_display
        const resMentors = filteredMentors.slice((num_page-1)*num_display-1,tail-1)
    }
        
    res.send({
        total:length,
        data:resMentors
    })
})
/** Validators */

exports.studentAppValidator =[
        body('student_num',"Invalid Student Number").not().isEmpty().isString().isLength({min:10,max:10}),
        body("email","Invalid Email").not().isEmpty().isEmail(),
        body("cgpa","Invalid CGPA").not().isEmpty().isFloat({min:0,max:4}),
        body("year","You need to be Second year and above").not().isEmpty().isInt({min:2,max:4}),
        body("resume_path", "Please Provide Your Resume").not().isEmpty(),
        body("have_group","Please let use know if you have a group").not().isEmpty().isBoolean(),
        body("project_idea","Please let use know if you have a project idea").not().isEmpty().isBoolean(),
        body("databases","Please select at least one databases").not().isEmpty(),
        body("platforms","Please select at least one platforms").not().isEmpty(),
        (req,res,next)=>{
            console.log("GOT TO VALIDATOR");
            let errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({'errors':errors.array()});
            }
            errors = studentDetailValidator(req.body);
            if (Object.keys(errors).length > 0){
                return res.status(400).json({'errors':[errors]});
            }
            next();
        }
];

function studentDetailValidator(req_data){
    const errors = {}
    const email_re = /^[^\s@]+@mail.utoronto.ca/;
    if (!email_re.test(req_data["email"])){
        errors["email"] = "Please use UofT email"
    }
    let db = req_data['databases'];
    let db_no_input = true;
    for (let i = 0; i < dbs.length; i++){
        if (db[dbs[i]]){
            db_no_input = false;
            break;
        }
    }
    if (db_no_input){
        errors["database"] = "Please select at least one databases";
    }
    let platforms = req_data['platforms'];
    if (!(platforms["none"] || (platforms['other'] !== ''))){
        let pre_select = platforms['pre-select'];
        if (pre_select){
            for (let i = 0; i < plats.length; i ++){
                if (pre_select[plats[i]]){
                    break;
                }
            }
        }
        errors["platforms"] = "Please select at least one platforms";
    }
    if (req_data["have_group"]){
        if (!req_data["group_members"]){
            errors["group"] = "Please enter your group members' information";
        }
    }
    if (req_data["project_idea"]){
        if (!req_data["idea_description"]){
            errors["idea"] = "Please enter your idea description";
        }
    }
    return errors;
}

exports.studentQueryValidator =[
    body("year","Invalid Year").not().isEmpty().isInt({min:2,max:4}),
    body("databases","Invalid Databases").not().isEmpty(),
    body("databases.any", "Invalid  Databases Any").not().isEmpty().isBoolean(),
    body("cloudPlat","Invalid Cloud Platform").not().isEmpty(),
    body("cloudPlat.any","Invalid  Clout Platform Any").not().isEmpty().isBoolean(),
    body("cgpa","Invalid cgpa").not().isEmpty().isFloat({min:0,max:4}),
    body("num_display","Invalid Num Display").not().isEmpty().isInt(),
    body("num_page","Invalid Num Pagee").not().isEmpty().isInt(),
    (req,res,next)=>{
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({'errors':errors.array()});
        }
        errors = querySubValidator(req.body);
        if (Object.keys(errors).length > 0){
            return res.status(400).json({'errors':[errors]});
        }
        next();
    }
];

exports.mentorQueryValidator =[
    body("year","Invalid Year").not().isEmpty().isInt({min:2,max:4}),
    body("complete_pey","Invalid Complate PEY").not().isEmpty().isBoolean(),
    body("databases","Invalid Databases").not().isEmpty(),
    body("databases.any", "Invalid  Databases Any").not().isEmpty().isBoolean(),
    body("cloudPlat","Invalid Cloud Platform").not().isEmpty(),
    body("cloudPlat.any","Invalid  Clout Platform Any").not().isEmpty().isBoolean(),
    body("cgpa","Invalid cgpa").not().isEmpty().isFloat({min:0,max:4}),
    body("num_display","Invalid Num Display").not().isEmpty().isInt(),
    body("num_page","Invalid Num Pagee").not().isEmpty().isInt(),
    (req,res,next)=>{
        let errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({'errors':errors.array()});
        }
        errors = querySubValidator(req.body);
        if (Object.keys(errors).length > 0){
            return res.status(400).json({'errors':[errors]});
        }
        next();
    }
];

const querySubValidator= (req_data)=>{
    const errors = {};
    const dbs = req_data.databases
    const plats = req_data.cloudPlat
    for (key in dbs.keys){
        console.log(typeof dbs.key);
        if (!(pre_dbs.includes(key) && typeof(dbs.key) == "boolean")){
            errors['databases'] = "databases has invalid input";
            break;
        }
    }
    for (key in plats.keys){
        if (!(pre_plats.includes(key) && typeof(plats.key) == "boolean")){
            errors['databases'] = "databases has invalid input";
            break;
        }
    }
    return errors;
}
/** Query Helper */

const mentorFilter = (filters,mentor) =>{
    for (key in filters.keys){
        // filter databases
        if (key === 'year'){
            if (mentor.year<filters.year){
                return false;
            }
        }
        if (key === 'cgpa'){
            if (mentor.cgpa < filters.cgpa){
                return false;
            }
        }
        if (key === 'complete_pey' && filters.complete_pey){
            if (!mentor.complete_pey){
                return false;
            }
        }
        if (key === 'databases' && !(filters.databases.any) && !(mentor.databases.none)){
            for (db in filters.databases){
                if (!mentor.databases.db){
                    return false;
                }
            }
        }
        // filter cloudPlat
        if (key === 'cloudPlat' && !(filters.cloudPlat.any) && !(mentor.platforms.none)){
            for (plat in filters.cloudPlat.plat){
                if (!mentor.platforms.plat){
                    return false;
                }
            }
        }
    }
    return true;
}

const studentFilter = (filters,student) =>{
    for (key in filters.keys){
        // filter databases
        if (key === 'year'){
            if (mentor.year<filters.year){
                return false;
            }
        }
        if (key === 'cgpa'){
            if (mentor.cgpa < filters.cgpa){
                return false;
            }
        }
        if (key === 'databases' && !(filters.databases.any) && !(mentor.databases.none)){
            for (db in filters.databases){
                if (!mentor.databases.db){
                    return false;
                }
            }
        }
        // filter cloudPlat
        if (key === 'cloudPlat' && !(filters.cloudPlat.any) && !(mentor.platforms.none)){
            for (plat in filters.cloudPlat.plat){
                if (!mentor.platforms.plat){
                    return false;
                }
            }
        }
    }
    return true;
}