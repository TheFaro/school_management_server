export class DepartmentsDto {
  readonly name: string;
}

export class DepartmentsArrayDto {
  readonly names: [DepartmentsDto];
}
