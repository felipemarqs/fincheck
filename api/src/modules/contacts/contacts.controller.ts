import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createContactDto: CreateContactDto,
  ) {
    return this.contactsService.create(userId, createContactDto);
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    console.log('Bateu aqui');
    return this.contactsService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(+id);
  }

  @Put(':contactId')
  update(
    @ActiveUserId() userId: string,
    @Param('contactId') contactId: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    console.log('contactId', contactId);

    return this.contactsService.update(userId, contactId, updateContactDto);
  }

  @Delete(':contactId')
  remove(
    @ActiveUserId() userId: string,
    @Param('contactId') contactId: string,
  ) {
    console.log('contactId', contactId);

    return this.contactsService.remove(userId, contactId);
  }
}
