import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import Image from './Image';

@Entity('NursingHome') //Conceito de API Decarator (associo que tudo que está na classe está associada a tabela)
export default class NursingHome{
    @PrimaryGeneratedColumn('increment') //Informo o tipo de dado que vai ser gerado no coluna id
    id: number;

    @Column() //Apenas pra indicar que cada é uma coluna no banco de dados
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    @OneToMany(() => Image, image => image.nursingHome, {
       cascade: ['insert', 'update'] 
    }) //Relacionamento com a tabela image 1:n
    @JoinColumn({ name: 'nursing_id'}) //nome da coluna que armazena o valor do relacionamento de nursing com images
    images: Image[];
}