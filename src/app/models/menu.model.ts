export class Menu {
  name: string;
  icon: string;
  path: string;
  display: boolean;
  child?: Menu[];

  constructor(input: Menu) {
    this.name = input.name;
    this.icon = input.icon;
    this.path = input.path;
    this.display = input.display;
    this.child = input. child;
  }
}