export class User {
  id?: number;
  username: string;
  password?: string;
  token?: string;
  roles?: string[];

  constructor(data: any) {
  }
}
