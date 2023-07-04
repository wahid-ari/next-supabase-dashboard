import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const searchHistoryData = {
  books: [],
  authors: [],
};

export const searchHistoryAtom = atomWithStorage('search-history', searchHistoryData);

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  function addBooksHistory(book: any) {
    setSearchHistory({ ...searchHistory, books: searchHistory.books.concat(book) });
  }
  function addAuthorsHistory(author: any) {
    setSearchHistory({ ...searchHistory, authors: searchHistory.authors.concat(author) });
  }
  function removeBooksHistory(id: any) {
    let booksFilter = searchHistory.books.filter((book) => book.id !== id);
    setSearchHistory({ ...searchHistory, books: booksFilter });
  }
  function removeAuthorsHistory(id: any) {
    let authorsFilter = searchHistory.authors.filter((author) => author.id !== id);
    setSearchHistory({ ...searchHistory, authors: authorsFilter });
  }
  function resetBooksHistory() {
    setSearchHistory({ ...searchHistory, books: [] });
  }
  function resetAuthorsHistory() {
    setSearchHistory({ ...searchHistory, authors: [] });
  }
  function resetAllSearchHistory() {
    setSearchHistory(searchHistoryData);
  }
  return {
    addBooksHistory,
    addAuthorsHistory,
    removeBooksHistory,
    removeAuthorsHistory,
    resetBooksHistory,
    resetAuthorsHistory,
    resetAllSearchHistory,
  };
}
