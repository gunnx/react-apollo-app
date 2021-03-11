import { PAGINATION_QUERY } from '../components/Pagination';

function paginationField() {
  return {
    keyArgs: false,
    read(currentItems = [], { args, cache }) {
      const { first, skip } = args;

      let data;
      try {
        data = cache.readQuery({ query: PAGINATION_QUERY });
      } catch {}

      if (data) {
        const count = data?._allProductsMeta?.count ?? 0;

        const page = skip / first + 1;
        const pages = Math.ceil(count / first);

        const items = currentItems.slice(skip, skip + first).filter(Boolean);

        if (items.length && items.length !== first && page === pages) {
          return items;
        }
        if (items.length !== first) {
          return false;
        }

        return items.length ? items : false;
      }

      return false;
    },
    merge(existing, incoming, { args }) {
      const { first, skip } = args;
      const merged = existing ? existing.slice(0) : [];

      const incomingLength = incoming.length;
      for (let i = skip; i < skip + incomingLength; i += 1) {
        merged[i] = incoming[i - skip];
      }

      return merged;
    },
  };
}

export default paginationField;
