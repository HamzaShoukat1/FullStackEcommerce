import { Module } from "@nestjs/common";
import { CategoriesService } from "./Categories.service.js";
import { CategoriesController } from "./Categories.controller.js";

@Module({
    providers:[CategoriesService],
    controllers:[CategoriesController]

})
export class CategoriesModule {}