import {Elysia} from 'elysia';

const app = new Elysia();

app.get('/', () => {
    return new Response('Hello World!');
})

app.listen(process.env.PORT || 3000);