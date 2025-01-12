import CommentVotingComponent from "./button/CommentVotingButton";

interface CommentsSectionProps {
  comments: Array<{
    comment_Id: string;
    content: string;
    user_Id?: number | null;
    anon_user_Id?: number | null;
    comment_Date: Date;
    score?: number | null;
  }>;
  postId: string;
  Users: {
    username: string;
    email: string;
  };
}

function CommentsSection({ comments, postId, Users }: CommentsSectionProps) {
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

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Answers</h3>
      <hr className="my-4 border-[#264743]" />
      <div className="space-y-4">
        {sortedComments.map((comment, index) => (
          <div key={comment.comment_Id}>
            {/* Display Users at the top left */}
            {Users && (
              <div className="mt-2">
                <span className="text-lg text-[#264743]">
                  {Users.username
                    ? Users.username
                    : Users?.email?.split("@")[0]}
                </span>
                <br />
                <span className="text-xs text-gray-500">
                  {new Date(comment.comment_Date).toLocaleDateString()}
                </span>
              </div>
            )}
            <div className="text-base text-gray-800 flex justify-between items-start">
              {comment.content && (
                <pre className="language-javascript max-w-3xl mx-auto mt-4">
                  <code dangerouslySetInnerHTML={{ __html: comment.content }} />
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

            {/* Add separator if not the last comment */}
            {index < comments.length - 1 && (
              <hr className="my-4 border-[#264743]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentsSection;
