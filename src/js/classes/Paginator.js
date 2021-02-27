export default class Paginator {
  constructor(paginatorContainer, paginatorLink) {
    this.paginatorContainer = paginatorContainer;
    this.paginatorLink = paginatorLink;
  }

  createPaginator(characterInfo) {
    let matchArray;
    let activePage;
    let url;
    let totalPages = characterInfo.pages;

    if(characterInfo.next) {
      matchArray = characterInfo.next.match(/\d+/);
      activePage = +matchArray[0] - 1;
      url = characterInfo.next.replace(/page=\d+/g, `page=1`);
    } else {
      matchArray = characterInfo.prev.match(/\d+/);
      activePage = +matchArray[0] + 1;
      url = characterInfo.prev.replace(/page=\d+/g, `page=1`);
    }

    let links = '';
    let berforePages = activePage - 1;
    let afterPages = activePage + 1;

    if(activePage > 1) {
      links += `<a href="${characterInfo.prev}" class="paginator__page paginator__page-previos">Prev</a>`;
    }

    if(activePage > 2) {
      links  += `<a href="${url.replace(/page=\d+/g, `page=${1}`)}" class="paginator__page paginator__page-number">1</a>`;
      if(activePage > 3) {
        links += `<span class="paginator__dots">...</span>`;
      }
    }

    for(let pageLength = berforePages; pageLength <= afterPages; pageLength++) {
      if(pageLength > totalPages) {
        continue;
      }
      if(pageLength === 0) {
        pageLength += 1;
      } 
      if(activePage === pageLength) {
        console.log(url);
        links += `<a href="${url.replace(/page=\d+/g, `page=${pageLength}`)}" class="paginator__page paginator__page-number paginator__page-number_is-active">${pageLength}</a>`;
        continue;
      }
      links += `<a href="${url.replace(/page=\d+/g, `page=${pageLength}`)}" class="paginator__page paginator__page-number">${pageLength}</a>`;
    }

    if(activePage < totalPages - 1) {
      if(activePage < totalPages - 2) {
        links += `<span class="paginator__page paginator__page-dots">...</span>`;
      }
      links  += `<a href="${url.replace(/page=\d+/g, `page=${totalPages}`)}" class="paginator__page paginator__page-number">${totalPages}</a>`;
    }

    if(activePage < totalPages) {
      links += `<a href="${characterInfo.next}" class="paginator__page paginator__page-next">Next</a>`;
    }

    return links;
  }

  addPaginators(paginators) {
    this.paginatorContainer.innerHTML = '';
    this.paginatorContainer.insertAdjacentHTML('beforeend', paginators);
  }

}