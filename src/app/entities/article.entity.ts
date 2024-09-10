import Author from "./author.entity";

export default interface Article {
    id: string,
    authors: Author[],
    title: string,
    summary: string,
    url: string
    publicationName: string;
    publicationId : string,
    volumeName: string,
    volumeId: string
}