import Posts from "./posts";

const PageSize = 10;

export default (page, sort) => {
  const start = PageSize * (page - 1);
  const end = PageSize * page;

  const posts = Posts;
  if (sort === "new") {
    posts.sort((a, b) => {
      return new Date(b.created) - new Date(a.created);
    });
  } else if (sort === "old") {
    posts.sort((a, b) => {
      return new Date(a.created) - new Date(b.created);
    });
  } else if (sort === "top") {
    posts.sort((a, b) => {
      return b.votes - a.votes;
    });
  }

  return {
    pages: Math.ceil(Posts.length / PageSize),
    posts: posts.slice(start, end),
  };
};
