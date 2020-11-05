import React from "react";
import Link from "next/link";

const PostCard = ({ post }) => {
  return (
    <li key={post.id}>
      {/* dynamic routing to make slug easily avalible */}
      <Link
        href={`/post/${post.slug}`}
        as={`/post/${encodeURIComponent(post.slug)}`}
        className="post-card"
      >
        <a>
          <>
            {post.title}

            <img
              src={post.feature_image}
              alt="Picture of the author"
              width={500}
              height={500}
            />

            <b> {post.primary_author.name}</b>

            <img src={post.primary_author.profile_image}></img>
            <p>{post.reading_time} min</p>
          </>
        </a>
      </Link>
    </li>
  );
};

export default PostCard;
