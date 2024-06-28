
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../auth/_services/user.service';
import { User } from '../../auth/_services/user.model'; 
import { ToastrService } from 'ngx-toastr';
import { DialogpermissionComponent } from '../dialogpermission/dialogpermission.component';
import { MatDialog } from '@angular/material/dialog';
import { interval } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent  implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null; 

 
  
  openEditModal(user: User): void {
    this.selectedUser = { ...user };
    console.log('Selected User:', this.selectedUser);
    this.showModal = true;
  }
 

  constructor(private userService: UserService, private toastr: ToastrService, private dialog: MatDialog,private spinner: NgxSpinnerService) {}

  showModal = false;
  toggleModal(){
    this.showModal = !this.showModal;
  }
  
  ngOnInit(): void {

    this.loadUsers();
    interval(5000).subscribe(() => {
      this.loadUsers();
    });
  }

  

   openPopup(user: User): void {
    this.selectedUser = user;
  }

  editUser( user: User): void {
  
    this.closePopup();
  }

  loadUsers(): void {

    this.spinner.show();
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        console.error('Error loading users:', error);
       
      }
    );
  }

  deleteUser(user: any): void {
    const dialogRef = this.dialog.open(DialogpermissionComponent, {
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete ${user.username}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.userService.deleteUser(user.id).subscribe(
          () => {
            this.toastr.success('User deleted successfully!', 'Success');
            this.loadUsers(); 
          },
          (error) => {
            console.error('Error deleting user:', error);
           
          }
        );
      }
    });
  }

  updateUser(): void {
    if (this.selectedUser) {
      const updatedUser: User = { ...this.selectedUser }; 
console.log(updatedUser)
  
      this.userService.updateUser(updatedUser.id, updatedUser).subscribe(
        () => {
          this.toastr.success('User updated successfully!', 'Success');
          this.loadUsers();
          this.toggleModal();
        },
        (error) => {
          console.error('Error updating user:', error);
          this.toastr.error('Failed to update user. Please try again.', 'Error');
        }
      );
    }
  }
  
  
  closePopup(): void {
    this.selectedUser = null;
  }

  
}