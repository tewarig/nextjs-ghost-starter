import { appUrl, contentKey } from "../site-config";

// https://onepbetter.herokuapp.com/ghost/api/v3/content/posts/?key=413feaabea32862b596edb8ee1&include=tags,authors

const allSettingUrl =
  appUrl +
  "ghost/api/v3/content/settings/?key=" +
  contentKey ;
export default allSettingUrl;


