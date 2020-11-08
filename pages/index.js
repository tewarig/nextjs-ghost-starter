import allPostUrl from "../services/post";
import Image from "next/image";
import Link from "next/link";
import NavBar from "./comp/navbar";

function Home({ posts }) {
  console.log(posts);
  return (
    <>
      <NavBar />
      <ul>
        {posts.posts.map((post) => (
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
                  <Image
                    unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                    src={post.feature_image}
                    width={500}
                    height={500}
                    loading="lazy"
                  />
                  <b> {post.primary_author.name}</b>
                  <Image
                    unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                    src={post.primary_author.profile_image}
                    alt={post.primary_author.name}
                    width={100}
                    height={100}
                  />{" "}
                  <p>{post.reading_time} min</p>
                </>
              </a>
            </Link>
          </li>
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
