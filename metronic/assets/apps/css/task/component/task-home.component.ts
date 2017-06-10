import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { ZorkService } from '../../service/zork-service.service';
@Component({
    moduleId: module.id,
    selector: 'task-home',
    templateUrl: '../view/task-home.component.html'
    })

export class TaskHomeComponent implements OnInit{
    @Input()
    title: string = ''

    @Input()
    propertyNames: any = [];

    @Output()
    view: EventEmitter<any> = new EventEmitter<any>()

    data: any[] = []

    url: string

    tempData: any[] = []

    showData: any[] = []

    colIndexes: any = {}

    perPage: number = 10;

    totalPage: number = 0;

    pageLength: number = 0;

    @Input()
    currentPage: number = 1;

    lineCount: number = 5;

    fields: Array<TableFiled> = new Array<TableFiled>()

    keyword: string

    constructor(private zorkService: ZorkService) {

    }

    @Input()
    params: string[] = [] // 点击查看按钮时需要传递出去的参数列表
     
     ngOnInit() {
        this.url="" 
        this.zorkService.getData(this.url, true).subscribe(data => {
            if (data.code == '000000') {
                let columns: any[] = data.data.Columns;
                let colIndexesTemp: any = {}
                let colIndex: number = 0;
                for (let col of columns) {
                    let colName = col["Name"];
                    colIndexesTemp[colName] = colIndex;
                    colIndex++;
                }
                this.colIndexes = colIndexesTemp;
                this.data = data.data.Rows
                this.tempData = this.data;
                this.initPageLength();
                this.initShowData();
                this.initFields()
            }
        })
    }

        initPageLength() {
        this.totalPage = (this.tempData.length + this.perPage - 1) / this.perPage | 0;
        this.pageLength = this.totalPage > 6 ? 6 : this.totalPage;
    }

    getTotalPage() {
        return (Number(this.tempData.length) + Number(this.perPage) - 1) / this.perPage | 0;
    }

    initShowData() {
        let end: number;
        if ((this.currentPage) * this.perPage > this.tempData.length) {
            end = this.tempData.length
        } else {
            end = (this.currentPage) * this.perPage
        }
        this.showData = this.tempData.slice((this.currentPage - 1) * this.perPage, end)
    }

    initFields() {
        for (let property of this.propertyNames) {
            let field: string[] = property.split(':')
            let name: string = field[0];
            let displayName: string = field[1];
            this.fields.push({ name: name, displayName: displayName });
        }
    }



    viewClick(row: any) {
        this.view.emit(row);
    }


    getParams(row: any): any {//row.Values[colIndexes[field.name]]
        let result: any = {}
        for (let param of this.params) {
            result[param] = row.Values[this.colIndexes[param]];
        }
        result['pageNo'] = this.currentPage;
        return result;
    }

    pageChange(num: number) {
        this.currentPage = num;
        this.initShowData();
    }

    search() {
        let tempData: any[] = []
        if (this.keyword == null || this.keyword == '') {
            tempData = this.data;
        }
        else {
            for (let row of this.data) {
                for (let field of this.fields) {
                    let text = row.Values[this.colIndexes[field.name]]
                    if (text.indexOf(this.keyword) != -1) {
                        tempData.push(row);
                        break;
                    }
                }
            }
        }

        this.tempData = tempData
        this.currentPage = 1;
        this.initShowData()
        this.initPageLength();
    }

    perPageChange(perPage: any) {
        this.perPage = Number(perPage);
        if (this.perPage == -1) {
            this.perPage = this.tempData.length;
        }
        this.initShowData();
        this.initPageLength();
    }
}
interface TableFiled {
    name: string,
    displayName: string
}





