import Volume from "./volume.entity";

export default interface Publication {
    id: string,
    title: string,
    volumes: Volume[],
    source: string
}