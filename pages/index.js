import allPostUrl from "../services/post";
import Image from "next/image";
import Link from "next/link";
import NavBar from "./comp/navbar";

function Home({ posts }) {
  console.log(posts);
  return (
    <>
      <NavBar />
      <br />
      <br />
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
                  <div className="card">
                    <div className="card-header">
                      <Image
                        unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                        src={post.feature_image}
                        width={400}
                        height={200}
                        loading="lazy"
                      />
                    </div>
                    <div className="card-body">
                      <span class="tag tag-teal">Technology</span>
                      <h4>{post.title}</h4>
                      <p>{post.slug}</p>
                      <div className="card-user">
                        <Image
                          unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                          src={post.primary_author.profile_image}
                          alt={post.primary_author.name}
                          width={50}
                          height={50}
                          className="author-profile"
                        />{" "}
                        <div class="user-info">
                          <h5>{post.primary_author.name}</h5>
                          <small>{post.reading_time} minutes </small>
                        </div>
                      </div>
                    </div>
                  </div>
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
