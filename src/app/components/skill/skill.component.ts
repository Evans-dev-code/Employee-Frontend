import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skill, SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  employeeId!: number;
  skillList: Skill[] = [];
  skillForm!: FormGroup;
  formVisible = false;
  isEdit = false;
  currentSkillId?: number;

  constructor(
    private route: ActivatedRoute,
    private skillService: SkillService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // ✅ Safely accessing parent route param
    this.route.parent?.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.employeeId = +idParam;
        this.loadSkills();
      }
    });

    // ✅ Setup the form
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      proficiencyLevel: ['', Validators.required],
      yearsOfExperience: [0],
      certified: [false],
      certificationName: ['']
    });
  }

  loadSkills(): void {
    if (!this.employeeId) return;
    this.skillService.getByEmployeeId(this.employeeId).subscribe(data => {
      this.skillList = data;
    });
  }

  showForm(skill?: Skill): void {
    this.formVisible = true;
    this.isEdit = !!skill;

    if (skill) {
      this.currentSkillId = skill.id;
      this.skillForm.patchValue(skill);
    } else {
      this.currentSkillId = undefined;
      this.skillForm.reset({ yearsOfExperience: 0, certified: false });
    }
  }

  hideForm(): void {
    this.formVisible = false;
    this.skillForm.reset();
  }

  submitForm(): void {
    if (this.skillForm.invalid) return;

    const skillData: Skill = {
      ...this.skillForm.value,
      employeeId: this.employeeId
    };

    const request$ = this.isEdit && this.currentSkillId
      ? this.skillService.update(this.currentSkillId, skillData)
      : this.skillService.add(skillData);

    request$.subscribe(() => {
      this.loadSkills();
      this.hideForm();
    });
  }

  deleteSkill(id: number): void {
    if (confirm('Are you sure you want to delete this skill?')) {
      this.skillService.delete(id).subscribe(() => this.loadSkills());
    }
  }
}
