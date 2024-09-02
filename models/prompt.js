import { Schema,models, model } from "mongoose";

const PromptSchema = new Schema({
    creator :{
        type: Schema.Types.ObjectId, 
        ref :'User',
    },
    prompt:{
        type: String,
        required:[ true, "Prompt is required"]
    },
    tag:{
        type: String,
        required:[ true, "Tag is required"]
    }
})

const Prompt = models.Prompt || model("Prompt", PromptSchema)
export default Prompt;


/* 
 we want to specify the creator of specific prompt
 it's going to have a type 
 SO the creator is going to be a document in the
 database more specifically the user type
 
 now we have to create a reference ref is going to be the user
 so it's going to be a one-to-many relationship one 
 user will be able to create many prompts

 next we have gonna prompt itself which is
*/