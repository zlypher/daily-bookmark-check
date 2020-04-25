(async () => {
  const bookmarks = (await browser.bookmarks.search({})).filter(
    (b) => b.type === "bookmark"
  );

  const [a, b, c, ...rest] = bookmarks;
  const selected = [a, b, c];

  const listElem = document.querySelector(".js-bookmark-list");
  console.log(listElem);
  listElem.innerHTML = bookmarkList(selected);
})();

const bookmarkList = (bookmarks) => `
<ul class="bookmark-list ">
    ${bookmarks.map(bookmarkListItem)}
</ul>`;

const bookmarkListItem = (bookmark) => `
<li class="bookmark-list__item">
${bookmarkItem(bookmark)}
</li>`;

const bookmarkItem = (bookmark) => `
<div class="bookmark-item">
    <div class="bookmark-item__title">${bookmark.title}</div>
    <div class="bookmark-item__url">${bookmark.url}</div>
</div>`;

{
  /* <li class="bookmark-list__item">
    <div class="bookmark-item">
        <div class="bookmark-item__title">This is the bookmark title</div>
        <div class="bookmark-item__url">/this/is/the/bookmark/path</div>
    </div>
</li> */
}
