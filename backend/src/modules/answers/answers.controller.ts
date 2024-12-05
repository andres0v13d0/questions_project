import { Controller, Get, Post, Put, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto, UpdateAnswerDto } from './answer.dto/answer.dto';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(createAnswerDto);
  }

  @Get()
  async findAll() {
    return this.answersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.answersService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(id, updateAnswerDto);
  }

  @Put(':id/soft-delete')
  async softDelete(@Param('id') id: number) {
    return this.answersService.softDelete(id);
  }

  @Put(':id/restore')
  async restore(@Param('id') id: number) {
    return this.answersService.restore(id);
  }
}
