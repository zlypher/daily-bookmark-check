const updateBookmarks = (bookmarks) => {
  const listElem = document.querySelector(".js-bookmark-list");
  listElem.innerHTML = bookmarkList(bookmarks);
};

const loadBookmarks = async () => {
  const bookmarks = (await browser.bookmarks.search({})).filter(
    (b) => b.type === "bookmark",
  );

  if (bookmarks.length <= 3) {
    return bookmarks;
  }

  return getRandom(bookmarks, 3);
};

const bookmarkList = (bookmarks) => `
<ul class="bookmark-list ">
    ${bookmarks.map(bookmarkListItem)}
</ul>`;

const bookmarkListItem = (bookmark) => `
<li class="bookmark-list__item">
    ${bookmarkItem(bookmark)}
</li>`;

const bookmarkItem = (bookmark) => `
<div class="bookmark-item js-bookmark-item" data-id="${bookmark.id}">
  <div>
    <div class="bookmark-item__title" title="${bookmark.title}">${bookmark.title}</div>
    <div class="bookmark-item__url" title="${bookmark.url}">${bookmark.url}</div>
  <div>
  <div>
    <button class="bookmark-item__del js-bookmark-item__del">X</button>
  </div>
</div>`;

const onDeleteClick = () => {
  console.log("on delete");
};

// https://stackoverflow.com/a/19270021/733368
function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

(async () => {
  const bookmarks = await loadBookmarks();
  updateBookmarks(bookmarks);
  console.log(bookmarks);

  document.addEventListener(
    "click",
    async (evt) => {
      if (evt.target.classList.contains("js-popup__load-btn")) {
        const newBookmarks = await loadBookmarks();
        updateBookmarks(newBookmarks);
        return;
      }

      if (evt.target.classList.contains("js-bookmark-item__del")) {
        const item = evt.target.closest(".js-bookmark-item");
        if (!item) {
          return;
        }

        const id = item.getAttribute("data-id");
        if (!id) {
          return;
        }

        try {
          // const singleBookmark = bookmarks.find((b) => b.id === id);
          await browser.bookmarks.remove(id);
        } catch (e) {
          console.error(e);
        }
      }
    },
    true,
  );
})();
