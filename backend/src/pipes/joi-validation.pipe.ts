import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ObjectSchema } from "joi";

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema ) {}

  transform(value: Record<string, any>) {
    const data = value.jwt?value.data:value;
    const { error } = this.schema.validate(data);
    if (error) {
      console.log(error);
      throw new BadRequestException({
        error: "validation failed",
        message: error.message.replace(/(\"|[\d])/g,""),
      });
    }
    return value;
  }
}
