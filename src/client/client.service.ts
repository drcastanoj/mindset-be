import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client, ClientDocument } from './client.schema';
import { Model } from 'mongoose';
import { ClientDto } from './client.dto';


@Injectable()
export class ClientService {
    constructor(@InjectModel(Client.name) private clientModel: Model<ClientDocument>) {}
      
    async create(createClientDto: ClientDto): Promise<Client> {
        const createdClient = new this.clientModel(createClientDto);
        return createdClient.save();
    }
      
    async findAll(): Promise<Client[]> {
        return this.clientModel.find().exec();
    }
      
    async findOne(email: string): Promise<Client> {
        return await this.clientModel.findOne({ email }).exec();
    }
}
