

export default function Comment({ comment }: { comment: any }) {

    return (

        <li>
            <p>{comment.content}</p>
            <p>{comment.name}</p>
        </li>
    )
}