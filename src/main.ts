import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors(
        {
            origin: "*",
            methods: "GET,PUT,POST,DELETE",
        }
    );
    await app.listen( process.env.PORT || 3000);
}

bootstrap().then(() => console.log("Server is running on port: " + (process.env.PORT || 3000)));
