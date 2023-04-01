export class Menu {
  name: string;
  icon: string;
  path: string;
  child?: Menu[];

  constructor(input: Menu) {
    this.name = input.name;
    this.icon = input.icon;
    this.path = input.path;
    this.child = input. child;
  }
}