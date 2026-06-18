export function getFileName(extension: string): string {
    const fileChunks: string[] = extension.split("/");
    const fullFileName: string = fileChunks[fileChunks.length - 1];
    return fullFileName;
}
