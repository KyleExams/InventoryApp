import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Inventory } from '../../models';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    inventory: Inventory[];

    public constructor(private http: HttpClient,
        private router: Router,
        private toastr: ToastrService) { }

    public ngOnInit(): void {
        this.LoadInventory();
    }

    public AddItem(): void {
        this.router.navigateByUrl('add-edit');
    }

    public EditItem(guid: string): void {
        this.router.navigateByUrl('add-edit/' + guid);
    }

    public DeleteItem(guid: string): void {
        this.http.delete('http://localhost:4000/delete/' + guid, httpOptions)
            .subscribe(
                res => {
                    this.LoadInventory();
                },
                err => {
                    this.toastr.error('Error', err.error.Message);
                });
    }

    private LoadInventory(): void {
        this.http.get<Inventory[]>('http://localhost:4000/get')
            .subscribe(
                res => {
                    this.inventory = res;
                },
                err => {
                    this.toastr.error('Error', err.error);
                });
    }
}

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
