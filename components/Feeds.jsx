"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import PromptCard from "./PromptCard";

const Feeds = () => {
  const { data: session } = useSession();
  const [prompts, setPrompts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [focus, setFocus] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    const fetchData = () => {
      fetch(`/api/prompt`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setPrompts(data);
        })
        .catch((err) => {
          console.error("Error fetching prompts:", err);
        });
    };

    fetchData();
  }, [session]);

  useEffect(() => {
    if (focus) {
      if (searchValue.length === 0 || searchValue.length > 2) {
        fetch(`/api/prompt?search=${searchValue.toString()}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            setPrompts(data);
          })
          .catch((err) => {
            console.error("Error fetching prompts:", err);
          });
      }
    }
  }, [searchValue]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <section className="feed">
        <form relative w-full flex-center>
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            placeholder="Search for a tag or username"
            className="search_input peer"
            onChange={handleSearchChange}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </form>

        <PromptCardList
          data={prompts}
          handleTagClick={(tag) => {
            inputRef.current.focus();
            // setFocus(true)
            setSearchValue(tag);
          }}
        />
      </section>
    </div>
  );
};

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export default Feeds;
