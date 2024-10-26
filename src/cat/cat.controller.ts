import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { Cat, CatService } from './cat.service';
import { PhoneValidatePipe } from './phone-validate.pipe';
import { CreateCatDto, createCatSchema } from './create.dto';
import { ZodValidationPipe } from './zod-validation.pipe';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get(':id')
  getCat(@Query('id', ParseIntPipe) id: number): Cat {
    return this.catService.findOne(id);
  }

  @Post(':id/phone')
  addPhone(
    @Param('id', ParseIntPipe) id: number,
    @Body('phone', new PhoneValidatePipe()) phone: string,
  ): Cat {
    return this.catService.addPhone(id, phone);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createCatSchema))
  async createCat(@Body() cat: CreateCatDto) {
    return this.catService.create(cat);
  }
}
