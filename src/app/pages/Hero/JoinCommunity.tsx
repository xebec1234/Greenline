import React from "react";

function JoinCommunity() {
  return (
    <div className="py-16">
      {/* Headline */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#264743]">
          Be part of our growing community!
        </h1>
        <p className="text-lg mt-4 text-[#264743]">
          Join us and contribute to a collaborative and thriving developer
          ecosystem.
        </p>
      </div>

      {/* Cards Section */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 text-center md:grid-cols-3 gap-8 max-w-4xl w-full">
          {/* Card 1 */}
          <div className="bg-[#d9d5c9] p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-[#264743] mb-4">
              Collaborate
            </h2>
            <p className="text-[#4a4a4a]">
              Work together with passionate developers to solve coding
              challenges, share insights, and grow as a team.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#d9d5c9] p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-[#264743] mb-4">
              Learn
            </h2>
            <p className="text-[#4a4a4a]">
              Gain knowledge from discussions, tutorials, and community feedback
              to enhance your programming skills.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#d9d5c9] p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-[#264743] mb-4">
              Innovate
            </h2>
            <p className="text-[#4a4a4a]">
              Bring your ideas to life by engaging with a community that fosters
              creativity and innovation in coding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinCommunity;
