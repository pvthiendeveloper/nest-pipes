import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './create.dto';

export type Cat = {
  id: number;
  name: string;
  phone?: string;
};

@Injectable()
export class CatService {
  cats: Cat[] = [
    { id: 1, name: 'Cat 1' },
    { id: 2, name: 'Cat 2' },
    { id: 3, name: 'Cat 3' },
  ];

  findOne(id: number): Cat {
    return this.cats.find(cat => cat.id === id);
  }

  addPhone(id: number, phone: string): Cat {
    const cat = this.findOne(id);
    cat.phone = phone;
    return cat;
  }

  create(cat: CreateCatDto): Cat {
    const newCat = {
      id: this.cats.length + 1,
      ...cat,
    };
    this.cats.push(newCat);
    return newCat;
  }
}
