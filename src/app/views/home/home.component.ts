import { PeriodicElement } from './../../models/PeriodicElement';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable, MatTableModule} from '@angular/material/table';
import { ElementDialogComponent } from '../../shared/element-dialog/element-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PeriodicElementService } from '../../services/PeriodicElemente.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [PeriodicElementService]
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource!: PeriodicElement[];

  constructor(public dialog: MatDialog,
  public periodicElementService: PeriodicElementService) {
    this.periodicElementService.getElements()
    .subscribe((data: PeriodicElement[]) => {
      this.dataSource = data;

    });
  }

ngOnInit(): void {

}

openDialog(element: PeriodicElement | null ): void {
  const dialogRef = this.dialog.open(ElementDialogComponent, {
    width: '250px',
    data: element === null ? {
      position: null,
      name: '',
      weight: null,
      symbol: ''
    } : {
    id: element.id,
    position: element.position,
    name: element.name,
    weight: element.weight,
    symbol: element.symbol
  }
  });

  dialogRef.afterClosed().subscribe(result => {
if(result !== undefined ) {
  if (this.dataSource.map(p => p.position).includes(result.id)){
    this.periodicElementService.editElement(result)
      .subscribe((data: PeriodicElement) => {
        const index = this.dataSource.findIndex(p => p.id === data.id );
        this.dataSource[result.position - 1] = result;
        this.table.renderRows();
      } )

  } else {
    this.periodicElementService.createElements(result)
    .subscribe((data:PeriodicElement)=> {
      this.dataSource.push(data);
      this.table.renderRows();

    });


  }
}
  });
}

editElement(element: PeriodicElement): void {
  this.openDialog(element);


}
deleteElement(position: number): void {
  this.periodicElementService.deleteElement(position)
  .subscribe(() => {
    this.dataSource = this.dataSource.filter(p => p.id !== position);
  });
 }
}

