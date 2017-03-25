import { Component, Injector, Input, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { ModalService } from "../modal.service";
import { Placeholder } from "./placeholder";

@Component({
  selector: 'modal-placeholder',
  templateUrl: 'modal-placeholder.component.html',
  styleUrls: ['modal-placeholder.component.scss']
})
export class ModalPlaceholderComponent implements OnInit {
  @Input()
  private id: string;

  @Input()
  private menuIsOpen = false;

  @ViewChild('modalplaceholder', {read: ViewContainerRef})
  private viewContainerRef: ViewContainerRef;

  constructor(public modalService: ModalService, private injector: Injector) {
  }

  ngOnInit() {
    const placeholder = new Placeholder();
    placeholder.id = this.id;
    placeholder.viewContainerRef = this.viewContainerRef;
    placeholder.injector = this.injector;

    this.modalService.registerPlaceholder(placeholder);
  }
}
