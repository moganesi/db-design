import {
  Component,
  ComponentRef,
  ElementRef,
  inject,
  model,
  signal,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { dia, shapes } from '@joint/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TableComponent } from '../table/table.component';
import { TableRelationComponent } from '../table-relation/table-relation.component';
import { TableNameForGraf } from '../../DataModel/TableNameForGraf';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxGeneratScript } from './dialog-box-generate-script';

@Component({
  selector: 'app-table-holder',
  standalone: true,
  imports: [
    TableComponent,
    DragDropModule,
    TableRelationComponent,
    MatGridListModule,
    MatButtonModule,
    CdkAccordionModule,
  ],
  templateUrl: './table-holder.component.html',
  styleUrl: './table-holder.component.scss',
})
export class TableHolderComponent {
  @ViewChild('canvas') canvas: ElementRef;

  private graph: dia.Graph;
  private paper: dia.Paper;
  generateShema() {
    let tableNames: Array<TableNameForGraf> = [];
    // let tablenm1: string = new TableNameForGraf();
    for (const refTable of this.arrayOfRefTables) {
      // Perform operations on each refTable
      // if (refTable.instance.hasForeignKeys == true) {
      let tableName = refTable.instance.tableName;
      let refTablesNames = refTable.instance.foreignKeys.map(
        (refTableName) => refTableName.referencedTableName
      );
      refTablesNames = [...new Set(refTablesNames)];

      tableNames.push({ tableName: tableName, refTablesNames: refTablesNames });

      // }
    }
    // let bbb = [];
    // let aaa = tableNames
    //   .filter((t) => t.refTablesNames.length > 0)
    //   .map((t) => t.refTablesNames);
    // for (var i = 0; i < aaa.length; i++) {
    //   for (var j = 0; j < aaa[i].length; j++) {
    //     bbb.push(aaa[i][j]);
    //   }
    // }
    // const arr = tableNames.filter((i) => !bbb.includes(i.tableName));
    console.log(tableNames);

    const { graph, paper } = this.grafSetUp();
    // let createReact: { tableName: string; rect: shapes.standard.Rectangle } = {
    //   tableName: '',
    //   rect: new shapes.standard.Rectangle(),
    // };
    let rect = createRect(25, 25, 280, 50, 'fake');
    let rect_linked = createRect(25, 25, 280, 50, 'fake');
    let createdRects: Array<{
      tableName: string;
      rect: shapes.standard.Rectangle;
    }> = [];
    tableNames.forEach((e) => {
      const element = createdRects.filter((o) => o.tableName == e.tableName);
      if (element.length == 0) {
        rect = createRect(25, 25, 280, 50, e.tableName);
        createdRects.push({ tableName: e.tableName, rect: rect });
        graph.addCell(rect);
      } else {
        rect = element[0].rect;
      }
      // const rect = createRect(25, 25, 280, 50, e.tableName);
      // createdRects.push({ tableName: e.tableName, rect: rect });
      // graph.addCell(rect);
      e.refTablesNames.forEach((t) => {
        const link = new shapes.standard.Link();
        link.source(rect);
        const element_inner = createdRects.filter((o) => o.tableName == t);
        if (element_inner.length == 0) {
          rect_linked = createRect(95, 255, 280, 50, t);
          createdRects.push({ tableName: t, rect: rect_linked });
          graph.addCell(rect_linked);
        } else {
          rect_linked = element_inner[0].rect;
        }
        // const rect_linked = createRect(95, 255, 280, 50, t);
        // createdRects.push({ tableName: t, rect: rect_linked });
        // graph.addCell(rect_linked);
        link.target(rect_linked);
        link.appendLabel({
          attrs: {
            text: {
              text: 'one to many',
            },
          },
        });
        link.router('orthogonal');
        link.connector('straight', { cornerType: 'line' });
        graph.addCell(link);
      });
    });

    paper.unfreeze();
  }

  private grafSetUp() {
    const graph = (this.graph = new dia.Graph({}, { cellNamespace: shapes }));

    const paper = (this.paper = new dia.Paper({
      model: graph,
      el: document.getElementById('canvas'),
      width: 1300,
      height: 700,
      background: {
        color: '#F8F9FA',
      },
      frozen: true,
      async: true,
      cellViewNamespace: shapes,
    }));
    return { graph, paper };
  }

  // readonly animal = signal('');
  // readonly script = model('');
  readonly dialog = inject(MatDialog);

  generateScript() {
    let dbScript = '';
    for (const refTable of this.arrayOfRefTables) {
      // Perform operations on each refTable
      dbScript = dbScript + ' ' + refTable.instance.generateScript();
    }

    const dialogRef = this.dialog.open(DialogBoxGeneratScript, {
      data: { script: dbScript },
    });
  }
  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  vcr!: ViewContainerRef;
  refTable!: ComponentRef<TableComponent>;
  refRelation!: ComponentRef<TableRelationComponent>;
  arrayOfRefTables: Array<ComponentRef<TableComponent>> = new Array<
    ComponentRef<TableComponent>
  >();
  addTable() {
    this.refTable = this.vcr.createComponent(TableComponent, { index: 0 });
    this.refTable.instance.removeTable.subscribe((data) => {
      console.log(data);
      const index = this.arrayOfRefTables.indexOf(data);
      this.arrayOfRefTables.splice(index, 1);
    });
    this.refTable.instance.refTable = this.refTable;
    this.arrayOfRefTables.push(this.refTable);
    console.log(this.arrayOfRefTables);
    // this.refRelation = this.vcr.createComponent(TableRelationComponent);
  }
}
function createRect(
  x: number,
  y: number,
  width: number,
  height: number,
  text: string
) {
  return new shapes.standard.Rectangle({
    position: { x: x, y: y },
    size: { width: width, height: height },
    attrs: {
      label: {
        text: text,
      },
    },
  });
}
