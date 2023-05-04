export interface File {
    name: string,
}

export interface Folder {
    name: string,
    files?: File[],
    directories?: Folder[][]
}