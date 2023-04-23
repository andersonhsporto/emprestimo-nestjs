import {ClientEntity} from "../entity/client.entity";
import {Min} from "@nestjs/class-validator";

export class ClientDto {

    name: string;
    cpf: string;
    telephone: string;
    street: string;
    number: string;
    zipCode: string;

    @Min(1)
    monthIncome: number;

    public static toEntity(clientDto: ClientDto): ClientEntity {
        return new ClientEntity(
            clientDto.name,
            clientDto.cpf,
            clientDto.telephone,
            clientDto.street,
            clientDto.number,
            clientDto.zipCode,
            clientDto.monthIncome
        );
    }

    public static fromEntity(clientEntity: ClientEntity): ClientDto {
        const clientDto: ClientDto = new ClientDto();
        clientDto.name = clientEntity.name;
        clientDto.cpf = clientEntity.cpf;
        clientDto.telephone = clientEntity.telephone;
        clientDto.street = clientEntity.street;
        clientDto.number = clientEntity.number;
        clientDto.zipCode = clientEntity.zipCode;
        clientDto.monthIncome = clientEntity.monthIncome;
        return clientDto;
    }

    public static fromEntityList(clientEntityList: ClientEntity[]): ClientDto[] {
        return clientEntityList.map(clientEntity => ClientDto.fromEntity(clientEntity));
    }
}
