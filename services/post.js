import axios from "axios";

import { appUrl, contentKey } from "../site-config";

// https://onepbetter.herokuapp.com/ghost/api/v3/content/posts/?key=413feaabea32862b596edb8ee1
const allPostUrl = appUrl + "ghost/api/v3/content/posts/?key=" + contentKey;
export default allPostUrl;
