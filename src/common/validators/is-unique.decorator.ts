import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueConstraint } from './is-unique.constraint';

export function IsUnique(options: { entity: any; column: string }, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint,
    });
  };
}