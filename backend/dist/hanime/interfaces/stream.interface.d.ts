export interface Stream {
    id: number;
    serverId: number;
    kind: string;
    extension: string;
    mimeType: string;
    width: number;
    height: number;
    durationInMs: number;
    filesizeMbs: number;
    filename: string;
    url: string;
}
