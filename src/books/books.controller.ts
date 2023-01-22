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

@Controller('books')
export class BooksController {
  private booksService: BooksService;
  constructor(private bookService: BooksService) {
    this.booksService = bookService;
  }
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
    return this.bookService.createBook(payload);
  }
  @Put('/:id')
  updateBook(@Param('id') id: string, @Body() payload: createBookDto) {
    return this.bookService.updateBook(id, payload);
  }
  @Delete('/:id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}
