const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  const likesSumReducer = (acc, blog) => acc + blog.likes;
  return blogs.reduce(likesSumReducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const mostLikedReducer = (fav, blog) => (fav.likes > blog.likes ? fav : blog);
  const { title, author, likes } = blogs.reduce(mostLikedReducer, blogs[0]);
  return { title, author, likes };
};

const groupBy = (list, key) => {
  const reducer = (acc, item) => {
    const val = item[key];
    return {
      ...acc,
      [val]: Object.prototype.hasOwnProperty.call(acc, val)
        ? [...acc[val], item]
        : [item],
    };
  };
  const groups = list.reduce(reducer, {});

  return Object.keys(groups).map((k) => {
    return { [key]: k, group: groups[k] };
  });
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const blogsByAuthor = groupBy(blogs, "author").map(({ author, group }) => {
    return { author, blogs: group.length };
  });

  const mostBlogsReducer = (acc, author) =>
    author.blogs > acc.blogs ? author : acc;

  return blogsByAuthor.reduce(mostBlogsReducer);
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const blogsByAuthor = groupBy(blogs, "author");
  const likesPerAuthor = blogsByAuthor.map((author) => {
    return { author: author.author, likes: totalLikes(author.group) };
  });
  const mostLikesReducer = (acc, author) =>
    acc.likes > author.likes ? acc : author;
  return likesPerAuthor.reduce(mostLikesReducer);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  groupBy,
};
