import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { StepService } from '../services/step.service';

@Injectable()
export class StepGuard implements CanActivate {
  // constructor(private router: Router) {}
  constructor(private stepService: StepService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.stepService.getState(this.router.routerState.snapshot.url).pipe(
      tap(value => console.log(value)),
      map(res => res && res !== 'danger'),
    );
  }
}
