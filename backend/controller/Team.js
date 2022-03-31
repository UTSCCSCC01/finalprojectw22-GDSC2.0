const mongoose = require("mongoose");
const teamModel = require("../models/teamModel");
const teamMemberModel = require("../models/teamMemberModel");
const studentModel = require("../model/studentAppModel");
const mentorModel = require("../model/mentorAppModel");

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
    const team = await teamModel.findOne({"team_name":req.body['team_name']})
    res.status(200).json({
        "description": team.description
    })
})
exports.setDescription = (async (req,res)=>{
    const teams = await teamModel.create({'description': req.body['description']})
    .catch((e) => {
        res.status(400).json({
            "error": e
        })
        return;
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
    const member = await teamMemberModel.findOne({"student_num":req.param.student_num})
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
    const team = await teamModel.findOne({'_id':req.param.team_id})
    .catch((e)=>{
        res.status(400).json({
            errors:e
        })
    })
    const members = await teamMemberModel.find({'team':req.param.team_id})
    .catch((e)=>{
        res.status(400).json({
            errors:e
        })
    })
    var students = [];
    var mentors = [];
    for (let i = 0; i < members.length; i++) { 
        if (members[i].role == "student"){
            let student = await studentModel.findOne({"student_num":members[i].student_num})
            students.push(student)
        }else{
            let mentor = await mentorModel.findOne({"student_num":members[i].student_num})
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
        "team_name": team.team_name
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
    .then((members)=>{
        res.status(200).json({
            'members':members
        })
    })
    .catch((e)=>{
        res.status(400).json({
            'error':"you should not get here"
        })
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
    await teamMemberModel.create({
        "student_num": req.body['student_num'],
        "role": req.body["role"],
        "team": team.id
    }).then((id)=>{
        res.status(200).json({
            "success": "member added successfully"
        })
    }).catch((e)=>{
        res.status(400).json({
            "error":e
        })
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
    await teamMemberModel.findOneAndDelete({
        "student_num":req.body['student_num'],
        "team": team.id
    }).catch((e)=>{
        res.status(400).json({
            "error":e
        })
        return;
    })
    res.status(200).json({
        "success":"remove success"
    })
})

// Validators