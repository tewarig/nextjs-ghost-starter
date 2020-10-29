import allPostUrl from "../services/post";
import Image from "next/image";

function Home({ posts }) {
  console.log(posts.posts[0].feature_image);
  return (
    <ul>
      {posts.posts.map((post) => (
        <>
          <li>{post.title}</li>

          <img
            src={post.feature_image}
            alt="Picture of the author"
            width={500}
            height={500}
          />
          <p>{post.reading_time} min</p>
        </>
      ))}
    </ul>
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
