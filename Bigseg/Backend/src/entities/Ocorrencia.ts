import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("ocorrencias")
export class Ocorrencia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  descricao!: string;

  @Column()
  local!: string;

  @Column()
  status!: string;

  @Column({ nullable: true })
  idade!: number;

  @Column({ nullable: true })
  sexo!: string;

  @Column({ nullable: true })
  produto!: string;

  @Column({ nullable: true })
  preco!: string;

  @Column({ nullable: true })
  setor!: string;

  @Column({ nullable: true })
  observacao!: string;

  @Column({ nullable: true })
  imagem!: string;

  @Column({ default: true })
  ativo!: boolean;

  @CreateDateColumn()
  created_at!: Date;
}
