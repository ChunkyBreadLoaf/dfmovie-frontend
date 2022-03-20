import { faFilm, faUsers, faList, faTableColumns, faPhotoFilm, faUsersGear } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from './side-menu.model';

export const menuItems: MenuItem[] = [
  new MenuItem('Dashboard', '/admin/dashboard', faTableColumns),
  new MenuItem('Content Management', '', faPhotoFilm, '', [
    new MenuItem('Movies', '/admin/movies', faFilm, 'Pages.Movies'),
    new MenuItem('Categories', '/admin/categories', faList, 'Pages.Categories'),
  ]),
  new MenuItem('System Management', '', faUsersGear, '', [
    new MenuItem('Users', '/admin/users', faUsers, 'Pages.Users'),
  ]),
];
