import { IMarkerImageFile } from "./marker-image-file.interface";

export interface MarkerImageModelInterface {
    id: number,
    title: string,
    description: string,
    files: IMarkerImageFile[]
}