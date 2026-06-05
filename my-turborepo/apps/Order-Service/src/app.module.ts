import {  Module } from '@nestjs/common';
import {OrderModule} from './Order/Order.module.js'


@Module({
    
    imports:[OrderModule]
})
export class AppModule {}
