import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/_services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  implements OnInit {
  constructor(public userService: UserService) {}
  ngOnInit(): void {
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && closeSidebar && sidebar) {
      menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
      });

      closeSidebar.addEventListener('click', () => {
        sidebar.classList.add('hidden');
      });
    }
  }
}