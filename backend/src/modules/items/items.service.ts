import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity/item.entity';
import { CreateItemDto, UpdateItemDto } from './item.dto/item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const { name } = createItemDto;
    const existingItem = await this.itemRepository.findOne({ where: { name, isDeleted: false } });
    if (existingItem) {
      throw new BadRequestException('El ítem ya existe.');
    }
    const item = this.itemRepository.create({ ...createItemDto, isDeleted: false });
    return this.itemRepository.save(item);
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find({ where: { isDeleted: false } });
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({ where: { id, isDeleted: false } });
    if (!item) {
      throw new NotFoundException(`Ítem con ID ${id} no encontrado.`);
    }
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.findOne(id);
    if (updateItemDto.name) {
      const existingItem = await this.itemRepository.findOne({
        where: { name: updateItemDto.name, isDeleted: false },
      });
      if (existingItem && existingItem.id !== id) {
        throw new BadRequestException('El nombre del ítem ya está en uso.');
      }
    }
    const updatedItem = { ...item, ...updateItemDto };
    return this.itemRepository.save(updatedItem);
  }

  async softDelete(id: number): Promise<Item> {
    const item = await this.findOne(id);
    item.isDeleted = true;
    return this.itemRepository.save(item);
  }

  async restore(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({ where: { id, isDeleted: true } });
    if (!item) {
      throw new NotFoundException(`Ítem con ID ${id} no encontrado o no eliminado.`);
    }
    item.isDeleted = false;
    return this.itemRepository.save(item);
  }
}
