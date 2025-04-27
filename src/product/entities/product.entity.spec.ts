import { Product } from './product.entity';

describe('Product class', () => {
  it('should create a Product with default values', () => {
    const product = new Product();

    expect(product).toBeTruthy();
    expect(product.id).toBeUndefined(); // เพราะ @PrimaryGeneratedColumn จะ auto-gen ตอน save
    expect(product.isActive).toBeUndefined(); // default เป็น true
    expect(product.price).toBeUndefined(); // ยังไม่ได้ set
    expect(product.amount).toBeUndefined(); // ยังไม่ได้ set
    expect(product.translations).toBeUndefined(); // ยังไม่ได้ set
  });

  it('should create a Product with provided values', () => {
    const product = new Product();
    product.id = 1;
    product.isActive = false;
    product.price = 199.99;
    product.amount = 5;
    product.translations = [];

    expect(product.id).toBe(1);
    expect(product.isActive).toBe(false);
    expect(product.price).toBe(199.99);
    expect(product.amount).toBe(5);
    expect(Array.isArray(product.translations)).toBe(true);
    expect(product.translations.length).toBe(0);
  });
});
