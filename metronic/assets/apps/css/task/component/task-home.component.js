"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var zork_service_service_1 = require("../../service/zork-service.service");
var TaskHomeComponent = (function () {
    function TaskHomeComponent(zorkService) {
        this.zorkService = zorkService;
        this.title = '';
        this.propertyNames = [];
        this.view = new core_1.EventEmitter();
        this.data = [];
        this.tempData = [];
        this.showData = [];
        this.colIndexes = {};
        this.perPage = 10;
        this.totalPage = 0;
        this.pageLength = 0;
        this.currentPage = 1;
        this.lineCount = 5;
        this.fields = new Array();
        this.params = []; // 点击查看按钮时需要传递出去的参数列表
    }
    TaskHomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.url = "";
        this.zorkService.getData(this.url, true).subscribe(function (data) {
            if (data.code == '000000') {
                var columns = data.data.Columns;
                var colIndexesTemp = {};
                var colIndex = 0;
                for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
                    var col = columns_1[_i];
                    var colName = col["Name"];
                    colIndexesTemp[colName] = colIndex;
                    colIndex++;
                }
                _this.colIndexes = colIndexesTemp;
                _this.data = data.data.Rows;
                _this.tempData = _this.data;
                _this.initPageLength();
                _this.initShowData();
                _this.initFields();
            }
        });
    };
    TaskHomeComponent.prototype.initPageLength = function () {
        this.totalPage = (this.tempData.length + this.perPage - 1) / this.perPage | 0;
        this.pageLength = this.totalPage > 6 ? 6 : this.totalPage;
    };
    TaskHomeComponent.prototype.getTotalPage = function () {
        return (Number(this.tempData.length) + Number(this.perPage) - 1) / this.perPage | 0;
    };
    TaskHomeComponent.prototype.initShowData = function () {
        var end;
        if ((this.currentPage) * this.perPage > this.tempData.length) {
            end = this.tempData.length;
        }
        else {
            end = (this.currentPage) * this.perPage;
        }
        this.showData = this.tempData.slice((this.currentPage - 1) * this.perPage, end);
    };
    TaskHomeComponent.prototype.initFields = function () {
        for (var _i = 0, _a = this.propertyNames; _i < _a.length; _i++) {
            var property = _a[_i];
            var field = property.split(':');
            var name_1 = field[0];
            var displayName = field[1];
            this.fields.push({ name: name_1, displayName: displayName });
        }
    };
    TaskHomeComponent.prototype.viewClick = function (row) {
        this.view.emit(row);
    };
    TaskHomeComponent.prototype.getParams = function (row) {
        var result = {};
        for (var _i = 0, _a = this.params; _i < _a.length; _i++) {
            var param = _a[_i];
            result[param] = row.Values[this.colIndexes[param]];
        }
        result['pageNo'] = this.currentPage;
        return result;
    };
    TaskHomeComponent.prototype.pageChange = function (num) {
        this.currentPage = num;
        this.initShowData();
    };
    TaskHomeComponent.prototype.search = function () {
        var tempData = [];
        if (this.keyword == null || this.keyword == '') {
            tempData = this.data;
        }
        else {
            for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
                var row = _a[_i];
                for (var _b = 0, _c = this.fields; _b < _c.length; _b++) {
                    var field = _c[_b];
                    var text = row.Values[this.colIndexes[field.name]];
                    if (text.indexOf(this.keyword) != -1) {
                        tempData.push(row);
                        break;
                    }
                }
            }
        }
        this.tempData = tempData;
        this.currentPage = 1;
        this.initShowData();
        this.initPageLength();
    };
    TaskHomeComponent.prototype.perPageChange = function (perPage) {
        this.perPage = Number(perPage);
        if (this.perPage == -1) {
            this.perPage = this.tempData.length;
        }
        this.initShowData();
        this.initPageLength();
    };
    return TaskHomeComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TaskHomeComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TaskHomeComponent.prototype, "propertyNames", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TaskHomeComponent.prototype, "view", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], TaskHomeComponent.prototype, "currentPage", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], TaskHomeComponent.prototype, "params", void 0);
TaskHomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'task-home',
        templateUrl: '../view/task-home.component.html'
    }),
    __metadata("design:paramtypes", [zork_service_service_1.ZorkService])
], TaskHomeComponent);
exports.TaskHomeComponent = TaskHomeComponent;
//# sourceMappingURL=task-home.component.js.map