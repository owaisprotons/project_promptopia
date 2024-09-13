"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Form from "@components/Form";

const updatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const promptId = useSearchParams().get("id");

  //   const searchParams = useSearchParams();
  //   const promptId = searchParamsget("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    // const fetchData =  () => {
    //    fetch(`api/prompt/${promptId}`, {
    //     method: "get",
    //   })
    //     .then((res) => res.json())
    //     .then((data) =>
    //       setPost({
    //         prompt: data.prompt,
    //         tag: data.tag,
    //       })
    //     );
    // };

    //Aysnc await approach
    const fetchData = async () => {
      const response = await fetch(`api/prompt/${promptId}`, {
        method: "get",
      });
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    fetchData();
  }, [promptId]);

  const handleUpdateprompt = async (e) => {
    e.preventDefault();

    if (promptId) {
      let response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      let data = response.json();

      if (response.ok) {
        router.push("/");
      }
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleUpdateprompt}
    />
  );
};

export default updatePrompt;
