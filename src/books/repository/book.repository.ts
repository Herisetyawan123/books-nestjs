import { EntityRepository, Repository } from 'typeorm';
import { filterBookDto } from '../dto/filter-book.dto';
import { Book } from '../entity/book.entity';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async getBooks(filter: filterBookDto): Promise<Book[]> {
    const { title, author, category } = filter;

    const query = this.createQueryBuilder('book');

    if (title) {
      query.andWhere('lower(book.title) LIKE :title', {
        title: `%${title.toLowerCase()}%`,
      });
    }

    if (author) {
      query.andWhere('lower(book.author) LIKE :author', {
        author: `%${author.toLowerCase()}`,
      });
    }

    if (category) {
      query.andWhere('lower(book.category) LIKE :category', {
        category: `%${category.toLowerCase()}`,
      });
    }

    return await query.getMany();
  }
}
