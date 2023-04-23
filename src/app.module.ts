import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ClientModule} from './client/client.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ClientEntity} from "./client/entity/client.entity";

@Module({
    imports: [ClientModule,
        TypeOrmModule.forRoot({
            type: 'better-sqlite3',
            database: ':memory:',
            dropSchema: true,
            entities: [ClientEntity],
            synchronize: true,
        }),],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
