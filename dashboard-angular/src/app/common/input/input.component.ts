import { Component,Input ,Output,EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() type: string = 'text';
  @Input() showPassword: boolean = false;

  @Output() togglePassword = new EventEmitter<void>();
  
}
