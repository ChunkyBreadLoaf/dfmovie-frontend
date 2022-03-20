export class MenuItem {
  id: number;
  parentId: number;
  label: string;
  route: string;
  icon: any;
  permissionName: string | null;
  isActive?: boolean;
  isCollapsed?: boolean;
  children: MenuItem[] | null;

  constructor(
    label: string,
    route: string,
    icon: any,
    permissionName: string | null = null,
    children: MenuItem[] | null = null
  ) {
    this.label = label;
    this.route = route;
    this.icon = icon;
    this.permissionName = permissionName;
    this.children = children;
  }
}
