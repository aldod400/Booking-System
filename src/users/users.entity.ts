import { Exclude } from 'class-transformer';
import { BookingEntity } from '../bookings/bookings.entity';
import { ProviderEntity } from '../providers/providers.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, OneToMany, UpdateDateColumn, Index } from 'typeorm';


export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  PROVIDER = 'provider',
}


@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Index({ unique: true })
    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    @Column({
        default: true,
        type: 'boolean',
    })
    isActive: boolean;

    @Column({ nullable: true })
    avatar: string;

    @Column({ default: false })
    isVerified: boolean;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToOne(() => ProviderEntity, provider => provider.user, { cascade: true })
    provider: ProviderEntity;
    
    @OneToMany(() => BookingEntity, booking => booking.user)
    bookings: BookingEntity[];

}