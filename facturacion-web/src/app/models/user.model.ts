export class User {
  id?: number;
  username: string;
  password?: string;
  token?: string;
  roles?: string[];

  constructor(data: any) {
    if (data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this[key] = data[key];
        }
      }
    }
  }
}
