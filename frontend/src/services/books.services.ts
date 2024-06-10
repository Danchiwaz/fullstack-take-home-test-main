import { gql } from "graphql-request";
import {graphQLClient} from "../utils/graphql";
import { Book } from "../types/book";

export const fetchBooksQuery = async ()=>{
    let response =  await graphQLClient.request(gql`
        query {
            books {
                author
                coverPhotoURL
                readingLevel
                title
            }
        }
    `);

    const mappedBooks = (response?.books ?? [])?.map((book: Book)=>{
        return ({...book, id: Math.floor(Math.random()* 100000)})
    })

    return mappedBooks as Book[]
}