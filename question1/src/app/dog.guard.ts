import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { User } from './user';
import { DogComponent } from './dog/dog.component';

const USER_KEY = 'user';

export const dogGuard: CanActivateFn = (route, state) => {
  const obj = JSON.parse(localStorage.getItem(USER_KEY)!!)

  if (!obj.prefercat) {
    return createUrlTreeFromSnapshot(route, ["/dog"]);
  }

  return true;

};
