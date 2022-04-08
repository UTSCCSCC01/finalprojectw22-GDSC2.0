const mongoose = require("mongoose");
const teamModel = require("../models/teamModel");
const teamMemberModel = require("../models/teamMemberModel");
const studentAppModel = require("../models/studentAppModel");
const mentorAppModel = require("../models/mentorAppModel");

// Generic Endpoints
exports.getAll = (async (req,res)=>{
    const teams = await teamModel.find().sort({"creation_time":-1})
    const response_body = {}
    for (let team of teams){
        let members = await teamMemberModel.find({"team":team._id})
        response_body[team['team_name']] = members
    }
    res.status(200).json({
        "all": response_body
    })
})



// Teams Endpoints
exports.getDescription = (async (req,res)=>{
    console.log("hello again")
    const team = await teamModel.findOne({"_id":req.body['id']})
    console.log(team);
    res.status(200).json({
        "description": team.description
    })
})

exports.setDescription = (async (req,res)=>{
    console.log("hello")
    const teams = await teamModel.findOneAndUpdate({'_id':req.body.id},{'description': req.body['description']})
    .catch((e) => {
        console.log("error")
        res.status(400).json({
            "error": e
        })
    })
   
})

exports.getPitch = (async (req,res)=>{
    const team = await teamModel.findOne({"team_name":req.body['team_name']})
    res.status(200).json({
        "pitch": team.pitch
    })
})
exports.setPitch = (async (req,res)=>{
    const teams = await teamModel.create({'pitch': req.body['pitch']})
    .catch((e) => {
        res.status(400).json({
            "error": e
        })
        return;
    })
   
})




/**
 * payload:{
 * }
 */
exports.getAllTeams = (async (req,res)=>{
    const teams = await teamModel.find().sort({"creation_time":-1})
    res.status(200).json({
        "teams": teams
    })
})

/**
 * payload:{
 *  student_num
 * }
 */
exports.getTeam = (async (req,res)=>{
    const member = await teamMemberModel.findOne({"student_num":req.body.student_num})
    .catch((e)=>{
        res.status(404).json({
            errors:e
        })
        return;
    })
    res.status(200).json({
        'team_id': member.team
    })
})

/**
 * payload:{
 *  team_id
 * }
 */
exports.getTeamInfo = (async (req,res)=>{
    const team = await teamModel.findOne({'_id':req.body.team_id})
    .catch((e)=>{
        res.status(400).json({
            errors:e
        })
        return;
    })
    const members = await teamMemberModel.find({'team':req.body.team_id})
    .catch((e)=>{
        res.status(400).json({
            errors:e
        })
        return;
    })
    var students = [];
    var mentors = [];
    for (let i = 0; i < members.length; i++) { 
        if (members[i].role == "student"){
            let student = await studentAppModel.findOne({"student_num":members[i].student_num})
            students.push(student)
        }else{
            let mentor = await mentorAppModel.findOne({"student_num":members[i].student_num})
            mentors.push(mentor)
        }
    }
    res.status(200).json({
        "team_name": team.team_name,
        "description": team.description,
        "pitch": team.pitch,
        "students": students,
        "mentors": mentors
    })
})
/**
 * payload:{
 *  team_name: string
 * }
 */
exports.createTeam = (async (req,res)=>{
    
    const team = await teamModel.create({'team_name':req.body['team_name']})
    .catch((e)=>{
        res.status(400).json({
            'error': e
        })
        return;
    })
    res.status(201).json({
        "success": "create team success",
        "team_name": req.body['team_name']
    })
})

/**
 * payload:{
 *  team_name: string
 * }
 */
exports.deleteTeam = (async (req,res)=>{
    const team = await teamModel.findOne({"team_name": req.body["team_name"]}
    ).catch((e)=>{
        res.status(404).json({
            "error":"not found"
        })
        return;
    })
    const members = await teamMemberModel.deleteMany({"team":team.id}
    ).catch((e)=>{
        res.status(404).json({
            "error":"members not found"
        })
        return;
    })
    await teamModel.findByIdAndDelete(team.id).catch((e)=>{
        res.status(400).json({
            "error":"delete team error"
        })
        return;
    })
    var student;
    await members.map((member)=>{
        if (member.role === "student"){
            student = studentAppModel.findOne({
                "student_num":member.student_num
            })
        }else{
            student = mentorAppModel.findOne({
                "student_num":member.student_num
            })
        }
        student.status = 3;
        student.save();
    })
    res.status(200).json({
        "success": "delete success"
    })
})

// Team Member Endpoints
/**
 * payload:{
 *  team_name: string
 * }
 */
exports.getTeamMembers = (async (req,res)=>{
    const team = await teamModel.findOne({"team_name":req.body['team_name']})
    .catch((e)=>{
        res.status(404).json({
            "error": "team does not exist"
        })
    })
    const members = await teamMemberModel.find({'team':team.id})
    .catch((e)=>{
        res.status(400).json({
            'error':"you should not get here"
        })
    })
    res.status(200).json({
        'members':members
    })
})

/**
 * payload:{
 *  team_name:string,
 *  student_num: string,
 *  role: string
 * }
 */
exports.addTeamMember = (async (req,res)=>{
    const team = await teamModel.findOne({"team_name":req.body["team_name"]})
    .catch((e)=>{
        res.status(400).json({
            "error":e
        })
        return;
    })
    console.log(req.body['student_num'])
    console.log(req.body["role"])
    await teamMemberModel.create({
        "student_num": req.body['student_num'],
        "role": req.body["role"],
        "team": team._id
    }).catch((e)=>{
        res.status(400).json({
            "error":e
        })
        return;
    })
    console.log(team);
    if (req.body["role"] === 'student'){
        await studentAppModel.findOneAndUpdate({
            "student_num": req.body['student_num']
        },{"status": 4})
    }else{
        await mentorAppModel.findOneAndUpdate({
            "student_num": req.body['student_num']
        },{'status':4})
    }
    res.status(200).json({
        "success": "member added successfully"
    })
})

/**
 * payload:{
 *  student_num:string
 *  team_name: string
 * }
 */
exports.removeTeamMember = (async (req,res)=>{
    const team = await teamModel.findOne({
        "team_name":req.body["team_name"]
    }).catch((e)=>{
        res.status(400).json({
            "error":e
        })
        return;
    })
    const role = await teamMemberModel.findOneAndDelete({
        "student_num":req.body['student_num'],
        "team": team.id
    }).catch((e)=>{
        res.status(400).json({
            "error":e
        })
        return;
    })
    if (role.role === "studednt"){
        var student = await studentAppModel.findOne({
            "student_num":req.body['student_num']
        })
    }else{
        var student = await mentorAppModel.findOne({
            "student_num":req.body['student_num']
        })
    }
    student.status = 3;
    student.save();
    res.status(200).json({
        "success":"remove success"
    })
})

/**
 * payload:{
 *  status: 3
 * }
 */
exports.getStudentApp = async (req,res)=>{
    const students = await studentAppModel.find({"status": 3}).catch((e)=>{
        res.status(400).json({
            "error": e
        })
    })
    res.status(200).json({
        "students":students
    })
}

/**
 * payload:{
 *  status: 3
 * }
 */
 exports.getMentorApp = async (req,res)=>{
    const mentors = await mentorAppModel.find({"status": 3}).catch((e)=>{
            res.status(400).json({
                "error": e
            })
        })
    res.status(200).json({
        "students":mentors
    })
}
// Validators