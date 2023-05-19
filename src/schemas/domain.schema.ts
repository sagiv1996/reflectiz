import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DomainDocument = HydratedDocument<Domain>;

@Schema({ timestamps: true })
export class Domain {
  @Prop({ required: true, unique: true, index: true, type: String })
  path: string;

  @Prop({ type: Object })
  virusTotal?: object;

  @Prop({ type: Object })
  whoIs?: object;

  @Prop() createdAt?: Date;
  @Prop() updatedAt?: Date;
}

export const DomainSchema = SchemaFactory.createForClass(Domain);
