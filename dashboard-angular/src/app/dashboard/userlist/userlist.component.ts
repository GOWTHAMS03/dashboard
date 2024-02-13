import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent implements OnInit {
  users = [
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "123-456-7890",
      "password": "********",
      "confirmPassword": "********"
    },
    {
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane.smith@example.com",
      "phone": "987-654-3210",
      "password": "********",
      "confirmPassword": "********"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  editUser(user: any): void {
    // Implement edit functionality here
    console.log('Editing user:', user);
  }

  deleteUser(user: any): void {
    // Implement delete functionality here
    const index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}