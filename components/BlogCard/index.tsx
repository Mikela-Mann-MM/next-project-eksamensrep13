import Link from "next/link"
import { BlogPost } from "@/types/blogpost";

type Props = {
  post: BlogPost;
};
export default function BlogCard({ post }: Props) {

    const formattedDate = Intl.DateTimeFormat("da-DK", { dateStyle: "long" }).format(new Date(post.createdAt));

    return (
        <Link href={`/blog/${post.id}`} aria-labelledby={"blog-card-" + post.id} >
            <article className="mb-4">
                <h2 id={"blog-card-" + post.id}>{post.title}</h2>
                <p>{post.author}</p>
                <p>{formattedDate}</p>
                <p className="line-clamp-2">{post.content}</p>
            </article>
        </Link>
    )
}

