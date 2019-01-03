import { Component, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('feedbackModal') 
  feedbackTemplate: TemplateRef<any>;

  @ViewChild('supportModal') 
  supportTemplate: TemplateRef<any>;

  @ViewChild('aboutModal') 
  aboutTemplate: TemplateRef<any>;

  modalRef: any;

  constructor(private service: BsModalService) {

  }

  feedback() {
    this.modalRef = this.service.show(this.feedbackTemplate);
  }

  support() {
    this.modalRef = this.service.show(this.supportTemplate);
  }

  about() {
    this.modalRef = this.service.show(this.aboutTemplate);
  }
}
