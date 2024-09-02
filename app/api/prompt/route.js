import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  const url = new URL(req.url);

  const searchValue = url.searchParams.get("search");

  console.log("searchValue", searchValue);

  try {
    await connectToDB();

    let prompts;

    if (searchValue && searchValue.trim().length > 0) {
      const searchRegex = new RegExp(searchValue.trim(), "i"); // 'i' makes it case-insensitive
      prompts = await Prompt.find({
        $or: [
          { prompt: { $regex: searchRegex } },
          { tag: { $regex: searchRegex } },
        ],
      }).populate("creator");

      if (prompts.length === 0) {
        return new Response(JSON.stringify([]), {
          status: 404,
        });
      }
    } else {
      prompts = await Prompt.find({}).populate("creator");
    }

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

// export const GET = async (req) => {
//   const url = new URL(req.url)

//   const searchValue = url.searchParams.get('search')

//   console.log("searchValue",searchValue)

//   try {
//     await connectToDB();

//     const prompts = await Prompt.find({}).populate("creator");

//     return new Response(JSON.stringify(prompts), { status: 200 });
//   } catch (error) {
//     return new Response("Failed to fetch prompts", { status: 500 });
//   }
// };
