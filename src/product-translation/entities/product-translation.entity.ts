import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_translations')
export class ProductTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  language: string; // เช่น "en", "th", "fr"

  @Column()
  name: string;

  @Column('text')
  description: string;

  @ManyToOne(() => Product, (p) => p.translations, { onDelete: 'CASCADE' })
  product: Product;

  @Column()
  productId: number;
}
