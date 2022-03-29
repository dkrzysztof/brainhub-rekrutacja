import { Type } from 'class-transformer';
import {
	IsDate,
	IsDateString,
	IsEmail,
	IsISO8601,
	IsNotEmpty,
	IsString,
} from 'class-validator';

export class CreateEventDto {
	@IsString()
	@IsNotEmpty()
	firstname: string;

	@IsString()
	@IsNotEmpty()
	lastname: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsDateString()
	@IsNotEmpty()
	date: string;
}
