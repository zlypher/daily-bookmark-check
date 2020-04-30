const getLastCheckedDate = async () => {
  const { lastCheckedDate } = await browser.storage.local.get(
    "lastCheckedDate",
  );
  return lastCheckedDate;
};

const setLastCheckedDate = async (date) =>
  await browser.storage.local.set({
    lastCheckedDate: date,
  });

const updateBookmarks = (bookmarks) => {
  const numBookmarks = bookmarks.length;
  const emptyItems =
    numBookmarks < 3
      ? new Array(3 - numBookmarks).fill(getEmptyBookmarkItem())
      : [];

  const listElem = document.querySelector(".js-bookmark-list");
  listElem.innerHTML = bookmarkList([...bookmarks, ...emptyItems]);
};

const toItem = (bookmark) => {
  return {
    status: "active",
    id: bookmark.id,
    bookmark: bookmark,
  };
};

const loadBookmarks = async () => {
  const bookmarks = (await browser.bookmarks.search({})).filter(
    (b) => b.type === "bookmark",
  );

  if (bookmarks.length <= 3) {
    return bookmarks.map(toItem);
  }

  return getRandom(bookmarks, 3).map(toItem);
};

const getEmptyBookmarkItem = () => {
  return {
    status: "empty",
    bookmark: {
      title: "-",
      url: "-",
      id: "-",
    },
  };
};

const bookmarkList = (bookmarks) => `
<ul class="bookmark-list ">
    ${bookmarks.map(bookmarkListItem).join("")}
</ul>`;

const bookmarkListItem = (bookmark) => `
<li class="bookmark-list__item">
    ${bookmarkItem(bookmark)}
</li>`;

const bookmarkItem = ({ status, bookmark }) => `
<div class="bookmark-item js-bookmark-item bookmark-item--${status}" data-id="${bookmark.id}">
  <div class="bookmark-item__wrapper">
    <div class="bookmark-item__title" title="${bookmark.title}">${bookmark.title}</div>
    <div class="bookmark-item__url" title="${bookmark.url}">${bookmark.url}</div>
  </div>
  <div>
    <button class="bookmark-item__del js-bookmark-item__del" title="Remove bookmark">X</button>
  </div>
</div>`;

const onDeleteClick = async (elem) => {
  console.log("on delete");

  const item = elem.closest(".js-bookmark-item");
  if (!item) {
    return;
  }

  const id = item.getAttribute("data-id");
  if (!id) {
    return;
  }

  try {
    await browser.bookmarks.remove(id);
    const singleItem = bookmarks.find((b) => b.id === id);
  } catch (e) {
    console.error(e);
  }
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
  const lastCheckedDate = await getLastCheckedDate();
  console.log(lastCheckedDate); // undefined, if not set

  await setLastCheckedDate(new Date());

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
        await onDeleteClick(evt.target);
      }
    },
    true,
  );
})();
