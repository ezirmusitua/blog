import { api_config } from "config";
import Remark42 from "./Remark42";

function Comments() {
  if (!api_config.comment.enabled) return null;
  return (
    <div className="comment-container pt-4">
      <Remark42 remark_config={api_config.comment}></Remark42>
    </div>
  );
}

export default Comments;
