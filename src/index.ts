import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import passport from 'passport';
import nunjucks from 'nunjucks';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import express, { Application } from 'express';

import IUser from './models/user.model';
import PassPort from './passport/index.passport';
import { sequelize } from './models/index.model';
import { corsOptions } from './middles/function/options';
import { error404, errorHandler } from './middles/function/errors';

declare global {
    // error404에서 error.status에 에러
    // Error 객체에 status 속성을 추가
    interface Error { status: number; }
    // index.passport에 user.id에서 에러
    // Express.User{} 속성에 아무것도 없음
    // User 테이블 속성들을 가져와서, Express.User{}에 속성 추가
    namespace Express {
        interface User extends IUser { }
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
PassPort();

const server: Application = express();

server.set('view engine', 'html');
nunjucks.configure('src/template', {
    express: server,
    watch: true,
});

sequelize.sync({ force: false })
    .then(() => { console.log('데이터 베이스 연결'); })
    .catch((err) => { console.error(err); })

server.use(morgan('dev'));
server.use(cors(corsOptions));
server.use('/', express.static(path.join(__dirname, 'public')));
server.use('/img', express.static(path.join(__dirname, 'uploads')));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(session({
    resave: false,
    saveUninitialized: false,
    // COOKIE_SECRET이 'string | undefined' 타입으로 설정되어 있어 에러
    // '!'를 붙여서 문자열(undefined가 아니라는 걸) 보증한다.
    secret: process.env.COOKIE_SECRET!,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));
server.use(passport.initialize());
server.use(passport.session());

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