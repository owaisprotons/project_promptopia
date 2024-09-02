"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const [posts, setsposts] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch(`/api/users/${session?.user.id}/posts`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setsposts(data);
          })
        .catch((err) => {
          console.error("Error fetching prompts:", err);
        });
    };

    if (session?.user.id) fetchData();
  }, [session]);

  const handleEdit = (post) => {
    alert("edit");
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const DeletePost = async () => {
      try {
        let response = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          const filteredPost = posts.filter((item) => item._id !== post._id);
          setsposts(filteredPost);
        } else {
          alert("failed to delete the prompt");
        }
      } catch (error) {
        alert("Failed to delete post");
      }
    };

    if (confirm("Are you sure ? Do you want to delete post ?") == true) {
      DeletePost();
    } else {
      alert("You canceled");
    }
  };
  return (
    <Profile
      name="My"
      desc="Welcome to your personalised profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;

/*
Finally we're also gonna create a special profile component
which we will able to use later on  so that's going to be


We won't know whose profile we are seeing and that's 
the primary reason why we're creating this separate
component because it can be my profile but it can be
also somebody else's profile So in this case the name is
going to be my profile 
later on i am gonna show how to reuse this component
to show someone else's profile
*/
