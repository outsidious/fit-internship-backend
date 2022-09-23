import { JwtService } from "@nestjs/jwt";
import { Http2ServerRequest } from "http2";

export function getValueFromTokenHelper(nameValue: string, req: Http2ServerRequest): string {
    const jwtService = new JwtService();
    return jwtService.decode(req.headers.authorization.split(' ')[1])[nameValue]
}