import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ClientStoreType } from 'src/app/models/ClientType';
import { selectClient } from 'src/app/redux/selectors.store';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'profile-dropdown',
    templateUrl: 'profile-dropdown.component.html'
})

export class ProfileDropdownComponent implements OnInit {
    @Input() hideName = false;
    client: ClientStoreType;

    constructor(
        private authService: AuthService,
        private router: Router,
        private store: Store
    ) { }


    ngOnInit() {
        this.store.select(selectClient).subscribe(data => this.client = data);
    }

    signOut() {
        this.authService.SignOut().subscribe(_ => {
            this.router.navigate(["/"]);
        });
    }
}