import { getAllBlogPosts } from "@/lib/dal";
import BlogCard from "@/components/BlogCard";

export default async function BlogPage() {

    const posts = await getAllBlogPosts()

    if (posts.succes === false) {
     return (
        <main>
            <h1>Oops, I did a boo boo</h1>
            <p>{posts.message}</p>
        </main>
     );      
    }

    return (
        <main>

        <h1 className="mb-4">Blog-indlæg</h1>
        { posts.data.map(post => (
            <BlogCard post={post} key={post.id} />
        ))}
        </main>
    )
}