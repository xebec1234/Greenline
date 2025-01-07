interface CommentsSectionProps {
  comments: Array<{
    comment_Id: string;
    content: string;
    user_Id?: number | null;
    anon_user_Id?: number | null;
    comment_Date: Date;
    score?: number | null;
  }>;
}

function CommentsSection({ comments }: CommentsSectionProps) {
  if (!comments || comments.length === 0) {
    return (
      <p className="text-gray-500 mt-4">
        No Answers yet. Be the first to reply!
      </p>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Answers</h3>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div
            key={comment.comment_Id}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            {/* Render the code block if post.body exists */}
            {comment.content && (
              <pre className="language-javascript max-w-3xl mx-auto mt-4">
                <code dangerouslySetInnerHTML={{ __html: comment.content }} />
              </pre>
            )}
            <div className="mt-2 text-xs text-gray-500">
              <span>Posted by: {comment.user_Id ?? "Anonymous"}</span> |{" "}
              <span>{new Date(comment.comment_Date).toLocaleDateString()}</span>
            </div>

            {/* Add separator if not the last comment */}
            {index < comments.length - 1 && (
              <hr className="my-4 border-gray-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentsSection;
