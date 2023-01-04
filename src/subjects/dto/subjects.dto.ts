export class SubjectsDto {
  readonly name: string;
  readonly departmentId: string;
  readonly level: string; // secondary or high_school
}

export class SubjectsArrayDto {
  readonly subjects: [SubjectsDto];
}
