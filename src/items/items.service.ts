import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemsRepositoy: Repository<Item>,
  ) {}

  async create(createItemInput: CreateItemInput): Promise<Item> {
    const newItem = this.itemsRepositoy.create(createItemInput);

    return await this.itemsRepositoy.save(newItem);
  }

  async findAll(): Promise<Item[]> {
    return await this.itemsRepositoy.find();
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemsRepositoy.findOneBy({ id });

    if (!item) throw new NotFoundException(`Item with id ${id} not found`);

    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    const item = await this.itemsRepositoy.preload(updateItemInput);

    if (!item) throw new NotFoundException(`Item with id ${id} not found`);

    return await this.itemsRepositoy.save(item);
  }

  async remove(id: string): Promise<Item> {
    // TODO: soft delete, integridad referencial
    const item = await this.findOne(id);

    await this.itemsRepositoy.remove(item);

    return {
      ...item,
      id,
    };
  }
}
