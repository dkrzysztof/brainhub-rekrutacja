import { Type } from 'class-transformer';
import {
	IsDate,
	IsDateString,
	IsEmail,
	IsISO8601,
	IsNotEmpty,
	IsString,
	Matches,
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

	@IsISO8601()
	@IsNotEmpty()
	@Matches(/.+T\d\d:\d\d:\d\d(\.\d{3})?Z/i, {
		message: '$property must include time after date as THH:MM:SSZ',
	})
	date: string;
}
