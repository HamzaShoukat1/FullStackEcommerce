import { Module } from '@nestjs/common';
import { ProductModule } from './Products/products.module.js';
import { CategoriesModule } from './Categories/categories.module.js';


@Module({
imports:[
  ProductModule,
  CategoriesModule
]
})
export class AppModule {}
