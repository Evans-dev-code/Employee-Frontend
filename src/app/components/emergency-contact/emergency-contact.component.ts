import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmergencyContactService } from 'src/app/services/emergency-contact.service';

@Component({
  selector: 'app-emergency-contact',
  templateUrl: './emergency-contact.component.html',
  styleUrls: ['./emergency-contact.component.scss']
})
export class EmergencyContactComponent implements OnInit {
  employeeId!: number;
  contacts: any[] = [];
  form!: FormGroup;
  editingId?: number;
  showForm = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private contactService: EmergencyContactService
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.employeeId = +id;
        this.loadContacts();
      }
    });

    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      relationship: ['', Validators.required]
    });
  }

  loadContacts(): void {
    this.contactService.getContacts(this.employeeId).subscribe(data => {
      this.contacts = data;
    });
  }

  openForm(contact?: any): void {
    this.showForm = true;
    if (contact) {
      this.editingId = contact.id;
      this.form.patchValue(contact);
    } else {
      this.editingId = undefined;
      this.form.reset();
    }
  }

  save(): void {
    const contactData = this.form.value;

    if (this.editingId) {
      this.contactService.updateContact(this.employeeId, this.editingId, contactData).subscribe(() => {
        this.loadContacts();
        this.cancel();
      });
    } else {
      this.contactService.addContact(this.employeeId, contactData).subscribe(() => {
        this.loadContacts();
        this.cancel();
      });
    }
  }

  deleteContact(contactId: number): void {
    this.contactService.deleteContact(this.employeeId, contactId).subscribe(() => {
      this.loadContacts();
    });
  }

  cancel(): void {
    this.form.reset();
    this.editingId = undefined;
    this.showForm = false;
  }
}
