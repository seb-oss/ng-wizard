import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StepService } from '../services/step.service';

@Injectable({
  providedIn: 'root',
})
export class StepGuard implements CanActivate {
  constructor(private stepService: StepService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.stepService
      .getState(this.router.routerState.snapshot.url)
      .pipe(map(res => (res && res.state) || this.router.parseUrl('/form-and-route-guard')));
  }
}
