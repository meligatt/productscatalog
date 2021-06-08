import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { Category } from "./Category";

type ProductOptions = {
  category: Category;
  name: string;
  purchasePrice: number;
  salePrice: number;
  description?: string;
  imagePath?: string;
  attachmentPath?: string;
  supplierName?: string;
};

@Entity()
export class Product extends BaseEntity {
  constructor(productOptions: ProductOptions) {
    super();
    if (productOptions) {
      this.category = Promise.resolve(productOptions.category);
      this.name = productOptions.name;
      this.purchasePrice = productOptions.purchasePrice;
      this.salePrice = productOptions.salePrice;
      this.description = productOptions.description || "";
      this.imagePath = productOptions.imagePath || "";
      this.attachmentPath = productOptions.attachmentPath || "";
      this.supplierName = productOptions.supplierName || "";
    }
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column()
  public name: string;
  @Column()
  public description: string;
  @Column({
    default: "",
  })
  public imagePath: string;
  @Column({
    default: "",
  })
  public attachmentPath: string;
  @Column({
    default: 0,
  })
  public purchasePrice: number;
  @Column({
    default: 0,
  })
  public salePrice: number;
  // NOTE: The name 'supplierName' is based on the fact that almost all
  // existing data refer to a supplier's name, but some of them use
  // the supplier's business ID. It's unclear whether this will eventually
  // need to be made consistent.
  @Column({
    default: "",
  })
  public supplierName: string;

  @ManyToOne(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (type) => Category,
    (category) => category.products,
    { onDelete: "SET NULL" }
  )
  public category: Promise<Category>;
}
