const mongoose = require("mongoose");
const teamModel = require("../models/teamModel");
const teamMemberModel = require("../models/teamMemberModel");

// Generic Endpoints
exports.getAll = (async (req,res)=>{
    const teams = await teamModel.find({}).sort({"creation_time":-1})
    const response_body = {}
    for (let team in teams){
        let members = await teamMemberModel.find({"team":team.id})
        response_body[team.team_name] = members
    }
    res.status(200).json({
        "all": response_body
    })
})

// Teams Endpoints
/**
 * payload:{
 * }
 */
exports.getAllTeams = (async (req,res)=>{
    const teams = await teamModel.find({}).sort({"creation_time":-1})
    res.status(200).json({
        "teams": teams
    })
})

/**
 * payload:{
 *  team_name: string
 * }
 */
exports.createTeam = (async (req,res)=>{
    await teamModel.create(req.body['team_name'])
    .then((id)=>{
        res.status(201).json({
            "success": "create team success"
        })
    })
    .catch((e)=>{
        res.status(400).json({
            'error': e
        })
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
    .then((id)=>{
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
    .catch((e)=>{
        res.status(404).json({
            "error": "team does not exist"
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