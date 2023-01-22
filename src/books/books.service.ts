import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { createBookDto } from './dto/create-books.dto';
import { filterBookDto } from './dto/filter-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { Repository } from 'typeorm';
import UpdateBookDto from './dto/update-books.dto';

@Injectable()
export class BooksService {
  // private bookRepository: BookRepository;
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async getAllBook(filter: filterBookDto) {
    return this.bookRepository.find();
  }

  async getBookById(id) {
    return await this.bookRepository.findBy({ id });
  }

  async createBook(payload: createBookDto) {
    const book = this.bookRepository.create(payload);
    await this.bookRepository.save(book);
    return {};
  }

  async updateBook(id, payload: UpdateBookDto) {
    await this.bookRepository.update(id, payload);
    const updatedBook = await this.bookRepository.findBy({ id });
    console.log(updatedBook);
    if (updatedBook.length !== 0) {
      return {
        message: 'Berhasil dirubah',
        data: updatedBook,
      };
    }

    throw new NotFoundException('Books Id is not exist');
  }

  async deleteBook(id) {
    await this.bookRepository.delete({ id });
    return {
      message: 'berhasil',
    };
  }

  async findBookId(id) {
    const updatedBook = await this.bookRepository.findBy({ id });
    if (updatedBook) {
      return {
        message: 'Berhasil dirubah',
        data: updatedBook,
      };
    }

    throw new NotFoundException('Books Id is not exist');
  }
}
