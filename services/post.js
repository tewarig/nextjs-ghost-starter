import axios from "axios";

import { appUrl, contentKey } from "../site-config";

// https://onepbetter.herokuapp.com/ghost/api/v3/content/posts/?key=413feaabea32862b596edb8ee1&include=tags,authors

const allPostUrl =
  appUrl +
  "ghost/api/v3/content/posts/?key=" +
  contentKey +
  "&include=tags,authors";
export default allPostUrl;





async function getStaticProps() {
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
