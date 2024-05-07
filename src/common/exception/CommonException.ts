import { HttpException, HttpStatus } from "@nestjs/common";

export class CommonException extends HttpException {
    constructor(mesage:string, status:HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR) {
        super(mesage, status)
    }
}