import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();

    const existingPrompts = await Prompt.findById(params.id);

    if (!existingPrompts) {
      return new Response("Prompt not found", { status: 404 });
    }

    existingPrompts.prompt = prompt;
    existingPrompts.tag = tag;

    await existingPrompts.save();

    return new Response(JSON.stringify(existingPrompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // await Prompt.findByIdAndRemove(params.id)
    const prompt = await Prompt.findById(params.id);
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    await prompt.deleteOne();
    return new Response("Prompt deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete the prompt", { status: 500 });
  }
};

/*
we are yet to a add functionlaities for 
edit and delete functions

Before we implement FE for this 
Let's go ahead and add the api route /endpoints
we can call

for edit it would inside api prompt and then
we have to know id the prompt to working
with so that's going to be dynamic... [id]
and then within it creat routes.js file

That routes is going to have three different types
of request

is going to have a :

--> GET to be able to (READ)

--> PATCH to be able to (UPDATE)


--> DELETE to be able to (DELETE)

*/
