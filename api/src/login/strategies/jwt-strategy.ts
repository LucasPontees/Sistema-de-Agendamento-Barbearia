import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { JwtFromRequestFunction } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}

function extractJwtFromCookie(
  req: Request & { cookies?: Record<string, string> },
): string | null {
  return typeof req?.cookies?.access_token === "string"
    ? req.cookies.access_token
    : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const secret = configService.get<string>("JWT_SECRET");
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const jwtExtractor: JwtFromRequestFunction = ExtractJwt.fromExtractors([
      extractJwtFromCookie,
      ExtractJwt.fromAuthHeaderAsBearerToken(),
    ]);

    super({
      jwtFromRequest: jwtExtractor,
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}
