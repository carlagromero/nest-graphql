import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  fullName: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  // @Field(() => String) we don't want to retrieve the password
  password: string;

  @Column({ type: 'text', array: true, default: ['user'] })
  @Field(() => [ValidRoles])
  roles: ValidRoles[];

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  isActive: boolean;
}
