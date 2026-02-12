import { getBlogPostById } from "@/lib/dal";
import { notFound } from "next/navigation";
import CommentSection from "@/components/CommentSection";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // id findes først her
  const post = await getBlogPostById(String(id));

  if (post.succes === false) {
    return (
      <main>
        <h1>Oops, I did a boo boo</h1>
        <p>{post.message}</p>
      </main>
    );
  }

  if (!post.data) return notFound();

  return (
    <main>
      <article>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        {/* <div dangerouslySetInnerHTML={{ __html: post.content }} /> */}
        <CommentSection comments={post.comments ?? []} />
      </article>
    </main>
  );
}
