import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userDetails: User[] = [
    new User(1, 'Thomaschako', 'thoma@xminds.com', 'xminds@123'),
  ];
}
