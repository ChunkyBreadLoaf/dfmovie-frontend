import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { AuthService } from '@shared/auth/auth.service';
import { filter } from 'rxjs';
import { BaseComponent } from '../base.component';
import { menuItems } from './side-menu.constant';
import { MenuItem } from './side-menu.model';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  private readonly menuItemsMap: { [key: number]: MenuItem };
  private activatedMenuItems: MenuItem[];

  @ViewChildren('menuChildren')
  private readonly menuChildrenEleRefs: QueryList<ElementRef<HTMLUListElement>>;

  menuItems: MenuItem[];

  private get permission(): string[] {
    return this.authService.currentUser?.permissions!;
  }

  get angleLeftIcon(): any {
    return faAngleLeft;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly renderer: Renderer2
  ) {
    super();

    this.menuItems = [];
    this.menuItemsMap = {};
    this.activatedMenuItems = [];
  }

  ngOnInit(): void {
    this.initStores();
    this.menuItems = menuItems;
    this.patchMenuItems(this.menuItems);
    this.activateMenuItems(this.router.url);
  }

  ngAfterViewInit(): void {
    const { nativeElement } = this.menuChildrenEleRefs.find(
      ({ nativeElement }) => {
        const { parentNode } = nativeElement;

        return (parentNode as HTMLElement).classList.contains('menu-open');
      }
    )!;

    if (nativeElement) {
      this.expandChildren(nativeElement);
    }
  }

  isMenuItemVisible(item: MenuItem): boolean {
    if (!item.permissionName) {
      return true;
    }

    return this.permission.includes(item.permissionName);
  }

  onItemWithChildrenClick(item: MenuItem, event: MouseEvent): void {
    item.isCollapsed = !item.isCollapsed;

    const { currentTarget } = event;
    const { parentNode } = currentTarget as HTMLElement;

    this.expandChildren(parentNode?.querySelector<HTMLUListElement>('ul')!);
  }

  private expandChildren(ele: HTMLUListElement) {
    const { style, scrollHeight } = ele;
    const { maxHeight } = style;

    if (maxHeight && maxHeight !== '0px') {
      this.renderer.setStyle(ele, 'maxHeight', '0px');
    } else {
      this.renderer.setStyle(ele, 'maxHeight', `${scrollHeight}px`);
    }
  }

  private patchMenuItems(items: MenuItem[], parentId?: number): void {
    items.forEach((item: MenuItem, index: number) => {
      item.id = parentId ? Number(parentId + '' + (index + 1)) : index + 1;

      if (parentId) {
        item.parentId = parentId;
      }

      if (parentId || item.children) {
        this.menuItemsMap[item.id] = item;
      }

      if (item.children) {
        this.patchMenuItems(item.children, item.id);
      }
    });
  }

  private activateMenuItems(url: string): void {
    this.deactivateMenuItems(this.menuItems);
    this.activatedMenuItems = [];

    const foundedItems = this.findMenuItemsByUrl(url, this.menuItems);

    foundedItems.forEach((item) => {
      this.activateMenuItem(item);
    });
  }

  private deactivateMenuItems(items: MenuItem[]): void {
    items.forEach((item: MenuItem) => {
      item.isActive = false;
      item.isCollapsed = true;

      if (item.children) {
        this.deactivateMenuItems(item.children);
      }
    });
  }

  private findMenuItemsByUrl(url: string, items: MenuItem[], foundedItems: MenuItem[] = []): MenuItem[] {
    items.forEach((item: MenuItem) => {
      if (item.route === url) {
        foundedItems.push(item);
      } else if (item.children) {
        this.findMenuItemsByUrl(url, item.children, foundedItems);
      }
    });

    return foundedItems;
  }

  private activateMenuItem(item: MenuItem): void {
    item.isActive = true;

    if (item.children) {
      item.isCollapsed = false;
    }

    this.activatedMenuItems.push(item);

    if (item.parentId) {
      this.activateMenuItem(this.menuItemsMap[item.parentId]);
    }
  }

  private onRouterNavigate(event: NavigationEnd) {
    const currentUrl = event.url !== '/' ? event.url : '/admin/users';
    const primaryUrlSegmentGroup =
      this.router.parseUrl(currentUrl).root.children[PRIMARY_OUTLET];

    if (primaryUrlSegmentGroup) {
      this.activateMenuItems('/' + primaryUrlSegmentGroup.toString());
    }
  }

  private initStores(): void {
    const routerNavEndEvents$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    );

    this.registerStore(routerNavEndEvents$, (event) =>
      this.onRouterNavigate(event as any)
    );
  }
}
