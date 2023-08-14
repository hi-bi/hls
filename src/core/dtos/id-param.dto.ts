import { IsUUID } from 'class-validator';

export class CheckParam {
    
    @IsUUID()
    id: string; // uuid v4
}
