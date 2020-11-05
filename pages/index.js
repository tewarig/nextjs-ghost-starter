import allPostUrl from "../services/post";
import Image from "next/image";
import Link from "next/link";
import NavBar from "./comp/navbar";
import PostCard from "./comp/postCard";

function Home({ posts }) {
  console.log(posts);
  return (
    <>
      <NavBar />
      <ul>
        {posts.posts.map((post) => (
          <PostCard post={post} />
        ))}
      </ul>
    </>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(allPostUrl);
  const posts = await res.json();

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}
export default Home;
