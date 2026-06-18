
export class CustomError extends Error {
    constructor(message: string, private _code: string, private _codeSubName?: string) {
        super(message)
    }
    get code(): string {
        return this._code
    }
    get codeSubName(): string | undefined{
        return this._codeSubName
    }
}