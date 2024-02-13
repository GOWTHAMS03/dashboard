import { Component,OnInit  } from '@angular/core';
import { AnimationService } from './animation.service';


@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.css'
})
export class ForbiddenComponent implements OnInit {

  animationText: string = '';

  constructor(private animationService: AnimationService) {}

  ngOnInit(): void {
    this.animationText = document.getElementsByTagName('div')[0].innerHTML.toString();
    document.getElementsByTagName('div')[0].innerHTML = '';

    setTimeout(() => {
      this.animationService.startAnimation(this.animationText);
    }, 0);

    this.animationService.animationText$.subscribe((animatedText) => {
      document.getElementsByTagName('div')[0].innerHTML = animatedText;
    });
  }

}
