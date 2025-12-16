import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('blacklisted_tokens')
export class BlacklistTokenEntity {    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    token: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    expiresAt: Date;
}