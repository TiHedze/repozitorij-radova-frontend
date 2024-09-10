import Volume from "./volume.entity";

export default interface Publication {
    title: string,
    volumes: Volume[]
}