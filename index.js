import {Elysia, t} from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';

const app = new Elysia()

const docsSetup = {
    path: '/docs',
    documentation: {
        info: {
            title: 'Auth API',
            version: '1.0.0',
            description: 'API to handle autentication and authorization',
        },
    }
}

app
    .use(cors())
    .use(swagger(docsSetup))
    .get('/', () => 'Hello There!')
    .group('/user', (app) => 
        app
            .get('/auth', () => {
                return new Response("user auth", {
                        status: 201,
                        headers: { 'X-Authorization': "accessToken" }
                    });
            })
            .guard(
                {
                    beforeHandle({ cookie: { session } }) {
                        if (session.value)
                            return (set.status = 'Unauthorized')
                    }
                },
                (app) =>
                    app
                        .get('/get', () => "user get")
                        .get('/find', () => ('User find'))
                        .put('/update', () => ('User update'))
                        .get('/refreshToken', () => ('User refresh token'))
                        .delete('/delete', () => ('User delete'))
                        .guard({
                            body: t.Object({
                                username: t.String(),
                                email: t.String(),
                                password: t.String(),
                            })
                        }, (app) =>   
                            app.post('/create', () => ('User create'))
                        )
            )
        )
    .listen(process.env.PORT || 3000)