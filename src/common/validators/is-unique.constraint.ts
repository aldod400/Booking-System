import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { DataSource } from "typeorm";

interface IsUniqueOptions {
  entity: any;
  column: string;
}

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface{
    constructor(private dataSource: DataSource) { }
    
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const [options] = validationArguments?.constraints as [IsUniqueOptions];

        const repo = this.dataSource.getRepository(options.entity);
        
        const exists = await repo.findOneBy({ [options.column]: value });

        return !exists;
    }

    defaultMessage(args: ValidationArguments): string {
        const [options] = args.constraints as [IsUniqueOptions];
        
        return `${options.column} must be unique. "${args.value}" is already taken.`;
    }
    
}