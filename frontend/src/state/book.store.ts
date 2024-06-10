import { create } from 'zustand'
import { Book } from '../types/book'

type ReadingListStore = {
    readingList: Book[],

    addToReadingList: (book: Book)=> void;
    removeFromReadingList: (id: number)=> void;
}
  

export const useReadingListStore = create<ReadingListStore>((set, get) => ({
  readingList: [],

  addToReadingList: (book: Book)=>{
    const previousList = get().readingList;
    if(!!previousList?.find(prevBook=>book.id===prevBook.id)) return;

    set({readingList: [...previousList, book]})
  },

  removeFromReadingList: (id:  number)=>{
    const previousList = get().readingList;
    set({readingList: [...previousList.filter(prevBook=>id !== prevBook.id)]})
  }
}))