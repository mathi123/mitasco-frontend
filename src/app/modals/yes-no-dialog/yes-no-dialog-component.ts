import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ModalBase } from "../modal-base";
import { DialogResult } from "./dialog-result";

@Component({
  selector: 'yes-no-dialog',
  templateUrl: 'yes-no-dialog.component.html'
})
export class YesNoDialogComponent extends ModalBase implements OnInit {
  @Input()
  private question: string;

  @Output() dialogClosed = new EventEmitter();

  constructor() {
    super();
  }

  ngOnInit() {
  }

  private yes() {
    this.closeWithResult(DialogResult.Yes);
  }

  private no() {
    this.closeWithResult(DialogResult.No);
  }

  private cancel() {
    this.closeWithResult(DialogResult.Cancel);
  }

  private closeWithResult(result: DialogResult) {
    this.dialogClosed.emit(result);
    this.closeModal();
  }
}
