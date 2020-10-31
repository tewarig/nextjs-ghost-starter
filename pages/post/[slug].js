import { useRouter } from "next/router";
import { appUrl, contentKey } from "../../site-config";

const Post = ({ post }) => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <>
      <h2>{slug}</h2>
      {/* <h2>{props}</h2> */}
      {/* <div>{post.html}</div> */}
    </>
  );
};

export default Post;
