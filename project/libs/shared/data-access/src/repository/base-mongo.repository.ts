import { Document, Model } from 'mongoose';
import { Entity, EntityFactory, StorableEntity } from "@project/shared-core";
import { Repository } from './repository.interface';
import { NotFoundException } from '@nestjs/common';

export abstract class BaseMongoRepository<
  T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>,
  DocumentType extends Document
> implements Repository<T> {

  constructor(
    protected entityFactory: EntityFactory<T>,
    protected readonly model: Model<DocumentType>,
  ) {}

  protected createEntityFromDocument(document: DocumentType): T | null {
    if (!document) {
      return null;
    }

    const plainObject = document.toObject({versionKey: false}) as ReturnType<T['toPOJO']>;
    return this.entityFactory.create(plainObject);
  }

  public async findById(id: T['id']): Promise<T> {
    const document = await this.model.findById(id).exec();
    return this. createEntityFromDocument(document);
  }

  public async save(entity: T): Promise<void> {
    const newEntity = new this.model(entity.toPOJO());
    await newEntity.save();

    entity.id = newEntity._id.toString();
  }

  public async update(entity: T): Promise<void> {
    const updateDocument = await this.model.findByIdAndUpdate(
      entity.id,
      entity.toPOJO(),
      {new: true, runValidators: true}
    )
      .exec();

    if (!updateDocument) {
      throw new NotFoundException(`Entity with id ${entity.id} not found. :(`);
    }
  }

  public async deleteById(id: T['id']): Promise<void> {
    const deleteDocument = await this.model.findByIdAndDelete(id).exec();

    if (!deleteDocument) {
      throw new NotFoundException(`Entity with id ${id} not found. :(`)
    }
  }
}
