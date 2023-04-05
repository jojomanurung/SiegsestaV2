export class Menu {
  name: string;
  icon: string;
  path: string;
  display: boolean;
  type: 'Link' | 'Subs';
  child?: Menu[];

  constructor(input: Menu) {
    this.name = input.name;
    this.icon = input.icon;
    this.path = input.path;
    this.display = input.display;
    this.type = input.type;
    this.child = input. child;
  }
}