import { get } from "../utils/AJAX";

export const PostsError = "canny/posts/error";
function postError(error) {
  return {
    error,
    timestamp: Date.now(),
    type: PostsError,
  };
}

export const PostsLoaded = "canny/posts/loaded";
function postsLoaded(posts, pages) {
  return {
    pages,
    posts,
    timestamp: Date.now(),
    type: PostsLoaded,
  };
}

export const RecountVotes = "canny/posts/recount";
export function recountVotes(posts, pages) {
  return {
    posts,
    pages,
    type: RecountVotes,
  };
}

export function fetchPosts(params) {
  return async (dispatch, getState) => {
    const { error, pages, posts } = await get("/api/posts/get", params);
    if (error) {
      return dispatch(postError(error));
    }
    await dispatch(recountVotes(posts, pages));
    return dispatch(postsLoaded(posts, pages));
  };
}

export function loadPosts(params) {
  return async (dispatch, getState) => {
    return dispatch(fetchPosts(params));
  };
}
