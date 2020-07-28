import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../service/api.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {CreateUpdateDialogComponent} from '../dialogs/create-update-dialog/create-update-dialog.component';
import {User} from '../shared/user-interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  dataSource = new MatTableDataSource<User>();
  columns: string[] = [
    'username',
    'name',
    'surname',
    'email',
    'role',
    'registrationDate',
    'enabled',
    'actions'
  ];
  private subs: Subscription[] = [];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('input', {static: true}) input: ElementRef;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getRecords();
  }

  ngAfterViewInit(): void {
    this.subs.push(
      fromEvent(this.input.nativeElement, 'keyup')
        .pipe(
          filter(Boolean),
          map((event: any) => event.target.value),
          debounceTime(500),
          distinctUntilChanged()
        ).subscribe(value => this.doFilter(value))
    );

    this.dataSource.sort = this.sort;
  }

  get isDeleteBtnDisabled(): boolean {
    return this.dataSource.data.length < 2;
  }

  public openCreateEditDialog(user?: User): void {
    const dialogRef = this.dialog.open(CreateUpdateDialogComponent, {
      width: '300px',
      data: {
        description: user ? 'update user' : 'create user',
        buttonTxt: {
          ok: 'Save',
          cancel: 'Cancel'
        },
        user
      }
    });

    dialogRef.afterClosed().subscribe(form => {
      if (user && form) {
        return this.putRecord(user.id, form.value);
      }
      if (form) {
        this.postRecord(form.value);
      }
    });
  }

  public openDeleteDialog(userId: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        description: 'delete user',
        message: 'Are you sure you want to delete the record?',
        buttonTxt: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.deleteRecord(userId);
      }
    });
  }

  private doFilter(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  private getRecords(): void {
    this.apiService.get().subscribe((users: User[]) => {
      this.dataSource.data = users;
    });
  }

  private postRecord(user: User): void {
    this.apiService.post(user).subscribe(() => this.getRecords());
  }

  private putRecord(userId: number, user: User): void {
    this.apiService.put(userId, user).subscribe(() => this.getRecords());
  }

  private deleteRecord(userId: number): void {
    this.apiService.delete(userId).subscribe(() => this.getRecords());
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
