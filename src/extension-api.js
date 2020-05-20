export const removeBookmarks = async (ids) => {
  return Promise.all(ids.map((id) => browser.bookmarks.remove(id)));
};

export const getAllBookmarks = async () => {
  return (await browser.bookmarks.search({})).filter(
    (b) => b.type === "bookmark",
  );
};

export const getMessage = (...args) => browser.i18n.getMessage(...args);

export const getLocalStorage = (...args) => browser.storage.local.get(...args);

export const setLocalStorage = (...args) => browser.storage.local.set(...args);
