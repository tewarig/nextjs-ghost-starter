import { useRouter } from "next/router";
import { appUrl, contentKey } from "../../site-config";

async function getPost(slug) {
  const res = await fetch(
    `${appUrl}/ghost/api/v3/content/posts/slug/${slug}?key=${contentKey}&fields=title,slug,html`
  ).then((res) => res.json());

  const posts = res.posts;

  return posts[0];
}
// Ghost CMS Request
export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);
  return {
    props: { post },
    revalidate: 15,
  };
};

export const getStaticPaths = () => {
  // paths -> slugs which are allowed
  // fallback ->
  return {
    paths: [],
    fallback: true,
  };
};

const Post = ({ post }) => {
  const router = useRouter();
  // const { slug } = router.query;
  // console.log(slug);
  // console.log(post);
  if (typeof post === "undefined") {
    return <h1> 404</h1>;
  }

  const title = post["title"];
  const body = post["html"];

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  if (!post) {
    return <h1>not find</h1>;
  }
  return post ? (
    <>
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: body }}></div>
      {/* <h2>{props}</h2> */}
      {/* <div>{post.html}</div> */}
    </>
  ) : (
    <> loading </>
  );
};

export default Post;
