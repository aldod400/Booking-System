import { BookingEntity } from "../bookings/bookings.entity";
import { SlotEntity } from "../slots/slots.entity";
import { UserEntity } from "../users/users.entity";
import { Column, Entity, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn, OneToOne, OneToMany } from "typeorm";

@Entity('providers')
export class ProviderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bio: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ default: true, type: 'boolean', name: 'is_active' })
    isActive: boolean;
    
    @Column({ name: 'user_id', unique: true })
    userId: number;

    @OneToOne(() => UserEntity, user => user.provider) 
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @OneToMany(() => BookingEntity, booking => booking.provider)
    bookings: BookingEntity[];

    @OneToMany(() => SlotEntity, slot => slot.provider)
    slots: SlotEntity[];
}