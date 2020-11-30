import { useRouter } from "next/router";
import { appUrl, contentKey } from "../../site-config";
import NavBar from "../comp/navbar";
import Footer from "../comp/footer";
import Image from "next/image";



async function getPost(slug) {
  const res = await fetch(
    `${appUrl}/ghost/api/v3/content/posts/slug/${slug}?key=${contentKey}&fields=title,feature_image,slug,html`
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

const styleObj = {
  color: 'white',
  backgroundColor: 'red'
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
  const image = post["feature_image"];

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  if (!post) {
    return <h1>not find</h1>;
  }
  console.log(post);
  return post ? (
    <>
      <NavBar />
      <br />
      <br />
      <h1 className="postTitle">{title}</h1>
      <Image className="postImage"  height={500} width={800} src={image}/>
      <div
        className="postBody"
        dangerouslySetInnerHTML={{ __html: body }}
      ></div>
      <br/>
      <br/>
      <br/>
      <Footer/>
     
    </>
  ) : (
    <> loading </>
  );
};

export default Post;
