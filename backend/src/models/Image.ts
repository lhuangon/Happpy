import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import NursingHome from './NursingHome';

@Entity('images') //Conceito de API Decarator (associo que tudo que está na classe está associada a tabela)
export default class Image {
    @PrimaryGeneratedColumn('increment') //Informo o tipo de dado que vai ser gerado no coluna id
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => NursingHome, nursingHome => nursingHome.images) //Relacionamento com a tabela image n:1
    @JoinColumn({ name: 'nursing_id' })
    nursingHome: NursingHome;
}