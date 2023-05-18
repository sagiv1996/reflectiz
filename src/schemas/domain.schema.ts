import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type DomainDocument = HydratedDocument<Domain>;

@Schema()
export class Domain {
  @Prop({ required: true, unique: true, index: true })
  path: string;
}

export const DomainSchema = SchemaFactory.createForClass(Domain);
