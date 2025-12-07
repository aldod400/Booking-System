import { ProviderEntity } from "../providers/providers.entity";
import { SlotEntity } from "../slots/slots.entity";
import { UserEntity } from "../users/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


export enum BookingStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
}

@Entity('bookings')
export class BookingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: BookingStatus,
        default: BookingStatus.PENDING,
    })
    status: BookingStatus;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @Column({ name: 'slot_id' })
    slotId: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'provider_id' })
    providerId: number;

    @ManyToOne(() => SlotEntity, slot => slot.bookings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'slot_id' })
    slot: SlotEntity;

    @ManyToOne(() => UserEntity, user => user.bookings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => ProviderEntity, provider => provider.bookings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'provider_id' })
    provider: ProviderEntity;
}