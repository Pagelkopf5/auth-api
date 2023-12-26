import {Elysia, t} from 'elysia';

new Elysia()
    .get('/', () => 'Hello There!')
    .group('/user', (app) => 
        app
            .get('/get', () => ('User get'))
            .get('/find', () => ('User find'))
            .post('/create', () => ('User create'))
            .put('/update', () => ('User update'))
            .delete('/delete', () => ('User delete'))
    )
    .listen(process.env.PORT || 3000)