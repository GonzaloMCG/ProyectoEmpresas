export class Article {
  public id?: string;
  public name: string;
  public price: number;
  public quantity?: number;
  public total?: number;
  public createdAt?: string;
  public description?: string;
  public updatedAt?: string;
  public stock?: number;
  public costprice?: number;

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
