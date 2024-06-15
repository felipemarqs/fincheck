import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from 'src/shared/database/repositories/contacts.repositories';

@Injectable()
export class ContactsService {
  constructor(private readonly contactsRepo: ContactsRepository) {}

  async create(userId: string, createContactDto: CreateContactDto) {
    return await this.contactsRepo.create({
      data: {
        userId,
        ...createContactDto,
      },
    });
  }

  async findAllByUserId(userId: string) {
    return await this.contactsRepo.findMany({
      where: { userId },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  async update(
    userId: string,
    contactId: string,
    updateContactDto: UpdateContactDto,
  ) {
    const contactsBelongsToUser = await this.contactsRepo.findUnique({
      where: { userId, id: contactId },
    });

    if (!contactsBelongsToUser) {
      throw new NotFoundException('Contato não encontrado!');
    }

    return await this.contactsRepo.update({
      data: { id: contactId, ...updateContactDto },
      where: { id: contactId },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
