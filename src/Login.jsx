// Bookmark
const [bookmark, setBookmark] = React.useState(
  JSON.parse(localStorage.getItem("bookmarkedMovie"))
);

function bookmarkIcon() {
  if (localStorage.getItem("bookmarkedMovie") === null) {
    localStorage.setItem(
      "bookmarkedMovie",
      JSON.stringify([movieData.currentMovie])
    );
    setBookmark(JSON.parse(localStorage.getItem("bookmarkedMovie")));
  } else if (!bookmark.some((el) => el.id === movieData.currentMovie.id)) {
    localStorage.setItem(
      "bookmarkedMovie",
      JSON.stringify([...bookmark, movieData.currentMovie])
    );
    setBookmark(JSON.parse(localStorage.getItem("bookmarkedMovie")));
  } else if (bookmark.some((el) => el.id === movieData.currentMovie.id)) {
    localStorage.setItem(
      "bookmarkedMovie",
      JSON.stringify(
        bookmark.filter(function (obj) {
          return obj.id !== movieData.currentMovie.id;
        })
      )
    );

    setBookmark(JSON.parse(localStorage.getItem("bookmarkedMovie")));
  }
}

function bookmarkFunc() {
  document.getElementById("input").value = "";

  currentAPI = "bookmark";
  setMovieData({
    ...movieData,
    API: currentAPI,
    movies: JSON.parse(localStorage.getItem("bookmarkedMovie")),
  });
}
