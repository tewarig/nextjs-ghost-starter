import allPostUrl from "../services/post";
import Image from "next/image";
import Link from "next/link";
import NavBar from "./comp/navbar";
import Banner from "./comp/title-img";
import Footer from "./comp/footer";

function Home({ posts }) {
  // console.log(posts);
  
  return (
    <>
      <NavBar />
      <br />
      <br />
    
      <Banner/>
      <br/>
      <ul>

        <div className="basic-grid">
          {posts.posts.map((post) => (
          
            <li key={post.id}>
              {/* dynamic routing to make slug easily avalible */}
              {/* {   post.primary_tag ?  post.primary_tag : "name: none"} */}
              {/* {post.primary_tag && console.log(post.primary_tag.name)} */}
  
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
                          // unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                          src={post.feature_image}
                          width={480}
                          height={480}
                          quality="25"
                        />
                      </div>
                      <div className="card-body">
          {post.primary_tag && <span class="tag tag-teal">{post.primary_tag.name}</span> }
                        <h4>{post.title}</h4>
                        <p>{post.slug}</p>
                        <div className="card-user">
                          <Image
                            // unoptimized={
                            //   process.env.ENVIRONMENT !== "PRODUCTION"
                            // }
                            src={post.primary_author.profile_image}
                            alt={post.primary_author.name}
                            width={50}
                            height={50}
                            className="author-profile"
                          />{" "}
                          <div class="user-info">
                            <h5>{post.primary_author.name}</h5>
                            <small>{post.reading_time} minutes read</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </a>
              </Link>
            </li>
          ))}
                  
        </div>
      </ul>
      <Footer/>     
    </>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, 

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
      revalidate: 1, // In seconds

    },
  };
}
export default Home;
