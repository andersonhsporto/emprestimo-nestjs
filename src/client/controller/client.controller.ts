import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ClientService} from "../service/client.service";
import {ClientDto} from "../dto/client.dto";

@Controller('/api/v1/client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {
    }

    @Post()
    async makeClient(@Body() clientDto: ClientDto): Promise<ClientDto> {
        return await this.clientService.makeClient(clientDto);
    }

    @Get()
    async getAllClients(): Promise<ClientDto[]> {
        return await this.clientService.findAll();
    }

    @Get('/:cpf')
    async getClientByCpf(@Param('cpf') cpf: string): Promise<ClientDto> {
        return await this.clientService.getClientByCpf(cpf);
    }

    @Delete('/:cpf')
    async deleteClientByCpf(@Param('cpf') cpf: string): Promise<void> {
        return await this.clientService.deleteClientByCpf(cpf);
    }

    @Put('/:cpf')
    async updateClientByCpf(@Param('cpf') cpf: string, @Body() clientDto: ClientDto): Promise<ClientDto> {
        return await this.clientService.updateClientByCpf(cpf, clientDto);
    }
}
