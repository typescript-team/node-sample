import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import passport from 'passport';
import nunjucks from 'nunjucks';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import express, { Application } from 'express'

import { error404, errorHandler } from './middles/function/errors'

declare global {
    // error404에서 error.status에 에러
    // Error 객체에 status 속성을 추가
    interface Error { status: number; }
    // index.passport에 user.id에서 에러
    // Express.User{} 속성에 아무것도 없음
    // User 테이블 속성들을 가져와서, Express.User{}에 속성 추가
    namespace Express {
        // interface User extends IUser { }
    }
}

import authRouter from './routers/auth.router';
import postRouter from './routers/post.router';
import todoRouter from './routers/todo.router';
import userRouter from './routers/user.router';
import indexRouter from './routers/index.router';

(() => {
    const result = dotenv.config({ path: path.join(__dirname, "configs", ".env") });
    if (result.parsed == undefined) throw new Error("Cannot loaded environment variables file.");
})();

const server: Application = express();

server.use('/', indexRouter);
server.use('/auth', authRouter);
server.use('/post', postRouter);
server.use('/todo', todoRouter);
server.use('/user', userRouter);

server.use(error404);
server.use(errorHandler);

server.listen(process.env.PORT, () => {
    console.log(`SERVER :: http://localhost:${process.env.PORT}`);
});