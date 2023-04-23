import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {ClientEntity} from "../entity/client.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {ClientDto} from "../dto/client.dto";

@Injectable()
export class ClientService {

    constructor(
        @InjectRepository(ClientEntity)
        private clientRepository: Repository<ClientEntity>) {
    }

    async makeClient(client: ClientDto): Promise<ClientDto> {
        if (!await this.existsByCpf(client.cpf)) {
            const clientEntity: ClientEntity = ClientDto.toEntity(client);
            const savedClient: ClientEntity = await this.clientRepository.save(clientEntity);

            return ClientDto.fromEntity(savedClient);
        }
        throw new HttpException("Client already exists", HttpStatus.BAD_REQUEST);
    }

    async findAll(): Promise<ClientDto[]> {
        const clientEntityList: ClientEntity[] = await this.clientRepository.find();

        return ClientDto.fromEntityList(clientEntityList);
    }

    async getClientByCpf(cpf: string): Promise<ClientDto> {
        if (await this.existsByCpf(cpf)) {
            const clientEntity: ClientEntity = await this.clientRepository
                .createQueryBuilder("client")
                .where("client.cpf = :cpf", {cpf})
                .getOne();

            return ClientDto.fromEntity(clientEntity);
        }
        throw new HttpException("Client not found", HttpStatus.NOT_FOUND);
    }

    async deleteClientByCpf(cpf: string): Promise<void> {
        if (await this.existsByCpf(cpf)) {
            await this.clientRepository.delete({cpf});
            return;
        }
        throw new HttpException("Client not found", HttpStatus.NOT_FOUND);
    }

    async updateClientByCpf(cpf: string, client: ClientDto): Promise<ClientDto> {
        if (await this.existsByCpf(cpf)) {
            const existingClient: ClientEntity = await this.clientRepository
                .createQueryBuilder("client")
                .where("client.cpf = :cpf", {cpf})
                .getOne();
            const updatedClient: ClientEntity = await this.updateClient(client, existingClient);

            return ClientDto.fromEntity(updatedClient);
        }
        throw new HttpException("Client not found", HttpStatus.NOT_FOUND);
    }


    private async updateClient(clientDto: ClientDto, clientEntity: ClientEntity): Promise<ClientEntity> {
        if (clientDto.name) {
            clientEntity.name = clientDto.name;
        }
        if (clientDto.telephone) {
            clientEntity.telephone = clientDto.telephone;
        }
        if (clientDto.street) {
            clientEntity.street = clientDto.street;
        }
        if (clientDto.number) {
            clientEntity.number = clientDto.number;
        }
        if (clientDto.zipCode) {
            clientEntity.zipCode = clientDto.zipCode;
        }
        if (clientDto.monthIncome) {
            clientEntity.monthIncome = clientDto.monthIncome;
        }
        return await this.clientRepository.save(clientEntity);
    }

    private async existsByCpf(cpf: string): Promise<boolean> {
        const clientNumber = await this.clientRepository
            .createQueryBuilder("client")
            .where("client.cpf = :cpf", {cpf})
            .getCount();

        return clientNumber > 0;
    }
}

