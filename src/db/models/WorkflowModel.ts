import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: 'workflow' })
export class WorkflowModel {
  @PrimaryColumn()
  id: string;

  @Column()
  category: string;

  @Column()
  subCategory: string;

  @Column()
  name: string;

  @Column()
  displayName: string;

  @Column()
  description: string;

  @Column()
  icon: string;

  @Column()
  iconFileName: string;
}
