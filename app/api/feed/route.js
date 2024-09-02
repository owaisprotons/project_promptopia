import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt"; // Assuming you have a Prompt model defined

export const GET = async (req) => {
  const url = new URL(req.url);
  try {
    await connectToDB();

    // const { userId } = req.params;
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    const prompts = await Prompt.find({ creator: userId });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

/*
api/feed?userId=1234 -->  const userId = url.searchParams.get("userId")
api/feed/1234        -->   404 Not found in this case
*/
