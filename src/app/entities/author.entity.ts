import Article from "./article.entity";

export default interface Author {
    id: string,
    firstName: string,
    lastName: string,
    articles: Article[]
}