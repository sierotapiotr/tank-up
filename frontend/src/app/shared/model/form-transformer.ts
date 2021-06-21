export class FormTransformer<T> {

  public fromForm(input: any): T {
    return Object.assign(this, input);
  }

}
