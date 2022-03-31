
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mentorAppSchema = new mongoose.Schema({
    student_num:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        match:[/^[^\s@]+@mail.utoronto.ca/,"Please Enter a Valid UofT Email Address"]
    },
    cgpa:{
        type: Number,
        min: 1.8,
        max: 4.0,
        required: true,
    },
    full_name:{
        type: String,
        required: true,
        maxlength: 100
    },
    program:{
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
        enum: [2,3,4]
    },
    resume_path:{
        type: String,
        required: true,
    },
    complete_pey:{
        type:Boolean,
        required:true
    },
    pey_description:{
        type:String,
        required: function(){
            return this.complete_pey;
        }
    },
    experience:{
        type:String,
        required: false
    },
    projects:{
        type: String,
        required: false
    },
    project_path:{
        type: String,
        required: false
    },
    frameworks:{
        type: String,
        required: true,
        lowercase: true,
    },
    languages:{
        type: String,
        required: true,
        lowercase: true,
    },
    databases:{
        sql:{
            type:Boolean,
            default:false
        },
        nosql:{
            type:Boolean,
            default:false
        },
        graph:{
            type:Boolean,
            default:false
        },
        none:{
            type:Boolean,
            default:false
        },
    },
    platforms:{
        pre_select:{
            aws:{
                type:Boolean,
                default:false
            },
            google_cloud:{
                type:Boolean,
                default:false
            },
            firebase:{
                type:Boolean,
                default:false
            },
            heroku:{
                type:Boolean,
                default:false
            },
            netlify:{
                type:Boolean,
                default:false
            },
            azure:{
                type:Boolean,
                default:false
            }
        },
        none:{
            type:Boolean,
            default:false
        },
        other:{
            type: String
        }
    },
    have_group:{
        type: Boolean,
        required: true,
    },
    group_members:{
        type: String,
        required: function(){
            return this.have_group;
        }
    },
    project_idea:{
        type: Boolean,
        required: true,
    },
    idea_desciption:{
        type: String,
        required: function(){
            return this.project_idea;
        }
    },
    links: {
        type: String,
        required: false
    },
    status: {
        type: Number,
        required: true,
        enum: [-1,1,2,3,4]
    },
    additional:{
        type: String,
        required: false
    },
    creation_time:{
        type:Date,
        default: Date.now,
        immutable: true
    }
});

const mentorAppModel = mongoose.model("mentorApp", mentorAppSchema);

module.exports = mentorAppModel;
