"use client";

import React, { useState, useEffect, useRef } from "react";

const Statistics = () => {
  const [posts, setPosts] = useState(0);
  const [users, setUsers] = useState(0);
  const [topics, setTopics] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // Set to false initially
  const statsRef = useRef<HTMLDivElement | null>(null); // Explicitly define the type
  const [apiData, setApiData] = useState({
    postsCount: 0,
    usersCount: 0,
    tagsCount: 0,
  });

  // Define animateCount outside of useEffect
  const animateCount = (
    target: number,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    let count = 0;
    const increment = Math.ceil(target / 200); // Adjust the increment for smoother animation
    const interval = setInterval(() => {
      if (count < target) {
        count += increment;
        if (count > target) count = target; // Ensure we don't exceed the target
        setter(count);
      } else {
        clearInterval(interval);
      }
    }, 50); // Adjust the interval for speed
  };

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch("/api/statistics");
        if (!response.ok) {
          throw new Error("Failed to fetch statistics");
        }
        const data = await response.json();
        setApiData(data); // Store the actual API data

        // Only trigger animation if visible
        if (isVisible) {
          setPosts(0);
          setUsers(0);
          setTopics(0);
          animateCount(data.postsCount, setPosts);
          animateCount(data.usersCount, setUsers);
          animateCount(data.tagsCount, setTopics);
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
        setPosts(0);
        setUsers(0);
        setTopics(0);
        animateCount(0, setPosts);
        animateCount(0, setUsers);
        animateCount(0, setTopics);
      }
    };

    fetchStatistics();
  }, [isVisible]); // Re-run the fetch when visibility changes

  useEffect(() => {
    const handleScroll = () => {
      if (statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect();
        const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
        if (isInView) {
          setIsVisible(true); // Trigger fade-in effect and start counting animation
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Only run once on mount for the scroll event

  return (
    <div
      ref={statsRef}
      className="bg-[#264743] p-20 shadow-md flex flex-row items-center gap-32 justify-center space-x-6"
    >
      <div
        className={`text-center text-white transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-6xl font-bold mt-2">{posts}</p>
        <h2 className="text-4xl font-semibold">Posts</h2>
      </div>
      <div
        className={`text-center text-white transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-6xl font-bold mt-2">{users}</p>
        <h2 className="text-4xl font-semibold">Users</h2>
      </div>
      <div
        className={`text-center text-white transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-6xl font-bold mt-2">{topics}</p>
        <h2 className="text-4xl font-semibold">Topics</h2>
      </div>
    </div>
  );
};

export default Statistics;
