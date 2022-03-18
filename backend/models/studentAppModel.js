
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const studentAppSchema = new mongoose.Schema({
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
    frameworks:{
        type: String,
        required: false,
        default: ''
    },
    languages:{
        type: String,
        required: false,
        default: ''
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
    idea_description:{
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
        enum: [1,2,3,4]
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

const studentAppModel = mongoose.model("studentApp", studentAppSchema);

module.exports = studentAppModel;
