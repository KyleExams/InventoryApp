import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Inventory } from '../../models';

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
    itemForAddEdit: Inventory = {
        _id: '',
        name: '',
        price: 0
    };
    pristineItem: Inventory = this.itemForAddEdit;
    isEdit = false;
    idForEdit: string;

    public constructor(private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService) { }

    public ngOnInit(): void {
        this.route.params.subscribe(params => {
            if (params['guid']) {
                this.idForEdit = params['guid'];
                this.GetItemForEdit(this.idForEdit);
                this.isEdit = true;
            }
        });
    }

    public SaveItem(): void {
        if (this.isEdit) {
            console.log(this.idForEdit);
            this.http.put('http://localhost:4000/edit/' + this.idForEdit, this.itemForAddEdit)
                .subscribe(
                    res => {
                        this.router.navigateByUrl('/');
                    },
                    err => {
                        this.toastr.error('Error', err.error.Message);
                    });
        } else {
            this.http.post('http://localhost:4000/add', this.itemForAddEdit)
                .subscribe(
                    res => {
                        this.router.navigateByUrl('/');
                    },
                    err => {
                        this.toastr.error('Error', err.error.Message);
                    });
        }
    }

    public cancelAddEdit(): void {
        this.router.navigateByUrl('/');
    }

    public isItemPristine(): boolean {
        return this.itemForAddEdit.name === this.pristineItem.name &&
            this.itemForAddEdit.price === this.pristineItem.price;
    }

    private GetItemForEdit(guid: string): void {
        this.http.get<Inventory>('http://localhost:4000/get/' + guid)
            .subscribe(
                res => {
                    this.itemForAddEdit = res;
                    this.pristineItem = { ...this.itemForAddEdit };
                },
                err => {
                    this.toastr.error('Error', err.error.Message);
                });
    }
}

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
