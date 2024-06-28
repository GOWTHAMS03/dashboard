
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private animationTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public animationText$: Observable<string> = this.animationTextSubject.asObservable();

  startAnimation(text: string): void {
    let i = 0;
    const interval$ = timer(0, 10);

    interval$
      .pipe(takeUntil(interval$.pipe(takeUntil(interval$.pipe(takeUntil(interval$.pipe(takeUntil(interval$)))))))) // Increase the number of pipeUntil as needed
      .subscribe(() => {
        i++;
        this.animationTextSubject.next(text.slice(0, i) + '|');
        if (i === text.length) {
          this.animationTextSubject.next(text);
          this.animationTextSubject.complete();
        }
      });
  }
}
