import {Module} from '@nestjs/common';
import {ClientController} from './controller/client.controller';
import {ClientService} from './service/client.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ClientEntity} from "./entity/client.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ClientEntity]),

    ],
    controllers: [ClientController],
    providers: [ClientService]
})
export class ClientModule {
}
