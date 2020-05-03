export const removeBookmarks = async (ids) => {
  return Promise.all(ids.map((id) => browser.bookmarks.remove(id)));
};

export const getAllBookmarks = async () => {
  return (await browser.bookmarks.search({})).filter(
    (b) => b.type === "bookmark",
  );
};
