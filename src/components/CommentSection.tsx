"use client";

import { useState } from "react";
import CommentVotingComponent from "./button/CommentVotingButton";
import ReplyForm from "./form/ReplyForm";

interface CommentsSectionProps {
  comments: Array<{
    comment_Id: string;
    content: string;
    user_Id?: number | null;
    anon_user_Id?: number | null;
    comment_Date: Date;
    score?: number | null;
    replies: Array<{
      reply_id: number;
      content: string;
      user_id: number | null;
      reply_date: Date;
    }>;
  }>;
  postId: string;
  Users: {
    username: string;
    email: string;
  };
  session: {
    user?: {
      id: string;
    };
  } | null;
  userReply: {
    id: number | null;
    username: string | null;
    email: string;
  }[];
  commentUsers: {
    id: number | null;
    username: string | null;
    email: string;
  }[];
}

function CommentsSection({
  comments,
  postId,
  Users,
  session,
  userReply,
  commentUsers,
}: CommentsSectionProps) {
  const [visibleReplyForm, setVisibleReplyForm] = useState<string | null>(null);
  const [visibleReplies, setVisibleReplies] = useState<{
    [key: string]: boolean;
  }>({});

  if (!comments || comments.length === 0) {
    return (
      <p className="text-gray-500 mt-4">
        No Answers yet. Be the first to reply!
      </p>
    );
  }

  // Sort comments by score (highest first), then by date (newest first)
  const sortedComments = [...comments].sort((a, b) => {
    const scoreA = a.score ?? 0;
    const scoreB = b.score ?? 0;

    // Compare by score
    if (scoreB !== scoreA) {
      return scoreB - scoreA;
    }

    // If scores are equal, compare by date
    return (
      new Date(b.comment_Date).getTime() - new Date(a.comment_Date).getTime()
    );
  });

  const toggleReplyForm = (commentId: string) => {
    setVisibleReplyForm((prev) => (prev === commentId ? null : commentId));
  };

  const toggleRepliesVisibility = (commentId: string) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Answers</h3>
      <hr className="my-4 border-[#264743]" />
      <div className="space-y-4">
        {sortedComments.map((comment, index) => {
          // Find the user that matches the comment's user_Id or anon_user_Id
          const user = commentUsers.find(
            (u) => u.id === comment.user_Id || u.id === comment.anon_user_Id
          );

          return (
            <div key={comment.comment_Id}>
              {/* Display Users at the top left */}
              <div className="mt-2">
                <span className="text-lg text-[#264743]">
                  {user
                    ? user.username
                      ? user.username
                      : user.email?.split("@")[0]
                    : "Anonymous"}
                </span>
                <br />
                <span className="text-xs text-gray-500">
                  {new Date(comment.comment_Date).toLocaleDateString()}
                </span>
              </div>
              <div className="text-base text-gray-800 flex justify-between items-start">
                {comment.content && (
                  <pre className="language-javascript max-w-3xl mx-auto mt-4">
                    <code
                      dangerouslySetInnerHTML={{ __html: comment.content }}
                    />
                  </pre>
                )}
                <div className="flex-shrink-0 ml-4">
                  <CommentVotingComponent
                    score={comment?.score ?? 0}
                    postId={postId ?? ""}
                    commentId={comment?.comment_Id ?? ""}
                  />
                </div>
              </div>

              <hr className="my-4 border-gray-300" />
              {/* Display replies for the current comment */}
              <div className="mt-4 ml-8 space-y-2">
                {comment.replies
                  ?.slice(
                    0,
                    visibleReplies[comment.comment_Id]
                      ? comment.replies.length
                      : 2
                  )
                  .map((reply) => {
                    // Find the user that matches the reply's user_id
                    const user = userReply.find(
                      (user) => user.id === reply.user_id
                    );

                    return (
                      <div
                        key={reply.reply_id}
                        className="border-l-2 border-gray-200 pl-4 text-sm"
                      >
                        <div className="text-gray-800">
                          {/* Display the user's username or email */}
                          <span className="font-semibold">
                            {user
                              ? user.username
                                ? user.username
                                : user.email?.split("@")[0]
                              : "Anonymous"}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            {new Date(reply.reply_date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="ml-5">{reply.content}</p>
                        <hr className="my-4 border-gray-300" />
                      </div>
                    );
                  })}
              </div>

              <span
                onClick={() => toggleReplyForm(comment.comment_Id)}
                className="text-[#264743] cursor-pointer underline pr-4"
              >
                Reply
              </span>
              {visibleReplyForm === comment.comment_Id && (
                <ReplyForm
                  comment_id={comment.comment_Id}
                  session={session}
                  post_id={postId}
                />
              )}

              {/* View all replies link */}
              {comment.replies.length > 2 && (
                <span
                  onClick={() => toggleRepliesVisibility(comment.comment_Id)}
                  className="text-[#264743] cursor-pointer underline"
                >
                  {visibleReplies[comment.comment_Id]
                    ? "View less replies"
                    : "View all replies"}
                </span>
              )}

              {/* Add separator if not the last comment */}
              {index < comments.length - 1 && (
                <hr className="my-4 border-[#264743]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CommentsSection;
