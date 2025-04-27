import { ProductTranslation } from 'src/product-translation/entities/product-translation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  isActive: boolean;

  @Column('float')
  price: number;

  @Column()
  amount: number;

  @OneToMany(() => ProductTranslation, (t) => t.product, { cascade: true })
  translations: ProductTranslation[];
}
