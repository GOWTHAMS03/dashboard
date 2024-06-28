// dashboard/userlist/edit-user.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../auth/_services/user.service';
import { User } from '../../auth/_services/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() user: User = {
    id: 0,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
  };
  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  updateUser(): void {
  
    this.userService.updateUser(this.user.id, this.user).subscribe({next: (val: any) => {
      console.log('form value' + this.user);
    },
    error: (err: any) => {
          console.error(err);
        }
    });
        
      }
    }

