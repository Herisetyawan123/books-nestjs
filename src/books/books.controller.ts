import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { createBookDto } from './dto/create-books.dto';
import { filterBookDto } from './dto/filter-book.dto';
import UpdateBookDto from './dto/update-books.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getAll(@Query() filter: filterBookDto) {
    return this.booksService.getAllBook(filter);
  }
  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.booksService.getBookById(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createBook(@Body() payload: createBookDto) {
    return this.booksService.createBook(payload);
  }
  @Put('/:id')
  updateBook(@Param('id') id: string, @Body() payload: UpdateBookDto) {
    return this.booksService.updateBook(id, payload);
  }
  @Delete('/:id')
  deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }
}
