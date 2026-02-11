
import Comment from "@/components/Comment";
import type { BlogComment } from "@/types/blogpost";

export default function CommentSection({ comments }: { comments: BlogComment[] }) {
  return (
    <section>
      <h2>Comments</h2>

      {comments.length ? (
        <ul>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ul>
      ) : (
        <p>No comments available. Be the first to comment!</p>
      )}
    </section>
  );
}
