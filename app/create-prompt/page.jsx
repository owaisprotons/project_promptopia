"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Form from "@components/Form";

const createPompt = () => {
  const router = useRouter();
  const {data: session} = useSession()

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("api/prompt/new", {
        method: "post",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default createPompt;

/* 

with the completion of createPost function
front end part is done

But now is the time that we create our API
endpoint and for this you would need a seperate
backend developer back in  all days you have to create
new backend server, express routes,
controller and all of that good stuffs
but now you can to that immediately


Keep in mind this is API you want to call
i taught you how you can create your own api endpoint 
in the crash course of this video

*/
