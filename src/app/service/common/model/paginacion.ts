export class Paginacion<T> {
  content: T[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;

  constructor() {
    this.content = [];
    this.pageable = {
      sort: {
        empty: false,
        sorted: false,
        unsorted: false,
      },
      offset: 0,
      pageNumber: 0,
      pageSize: 0,
      unpaged: false,
      paged: false,
    };
    this.last = false;
    this.totalPages = 0;
    this.totalElements = 0;
    this.size = 0;
    this.number = 0;
    this.sort = {
      empty: false,
      sorted: false,
      unsorted: false,
    };
    this.numberOfElements = 0;
    this.first = false;
    this.empty = false;
  }
}
