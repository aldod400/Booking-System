import { BookingEntity } from "../bookings/bookings.entity";
import { ProviderEntity } from "../providers/providers.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('slots')
export class SlotEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: 'time', name: 'start_time' })
        startTime: Date;

    @Column({ type: 'time', name: 'end_time' })
    endTime: Date;

    @Column({ default: true, type: 'boolean', name: 'is_available' })
    isAvailable: boolean;

    @Column({ name: 'provider_id' })
    providerId: number;
    
    @ManyToOne(() => ProviderEntity, provider => provider.slots, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'provider_id' })
    provider: ProviderEntity;
    
    @OneToMany(() => BookingEntity, booking => booking.slot, { cascade: true })
    bookings: BookingEntity[];
}